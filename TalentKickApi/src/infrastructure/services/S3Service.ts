import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.S3_BUCKET_NAME!;

    const s3Config: AWS.S3.ClientConfiguration = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    };

    // Configuración para Minio si se usa un endpoint diferente
    if (process.env.MINIO_ENDPOINT) {
      s3Config.endpoint = process.env.MINIO_ENDPOINT;
      s3Config.accessKeyId = process.env.MINIO_ROOT_USER || s3Config.accessKeyId;
      s3Config.secretAccessKey = process.env.MINIO_ROOT_PASSWORD || s3Config.secretAccessKey;

      // Esto es crucial para Minio local
      s3Config.s3ForcePathStyle = process.env.MINIO_S3_FORCE_PATH_STYLE === 'true';
      s3Config.signatureVersion = 'v4';
      s3Config.sslEnabled = process.env.MINIO_ENDPOINT.startsWith('https://');
    }

    this.s3 = new AWS.S3(s3Config);
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'feeds'): Promise<{ url: string, type: string, key: string }> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${folder}/${uuidv4()}${fileExtension}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.upload(params).promise();
      
      console.log(`[S3] Archivo subido con éxito. Key: ${fileName}`);
      // Devolvemos la key como url provisional para que el DTO sea compatible, 
      // pero el punto clave es la propiedad 'key'.
      return { url: fileName, type: file.mimetype, key: fileName };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file to S3');
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 60 * 60 * 24, // La URL expira en 24 horas
    };

    try {
      let url = await this.s3.getSignedUrlPromise('getObject', params);
      
      // Si usamos Minio local, forzamos que la URL use el endpoint configurado (IP local)
      if (process.env.MINIO_ENDPOINT) {
        const cleanEndpoint = process.env.MINIO_ENDPOINT.replace(/\/$/, '');
        const urlObj = new URL(url);
        url = `${cleanEndpoint}/${this.bucketName}${urlObj.pathname}${urlObj.search}`;
        
        // Limpieza de duplicación de bucket en el path si ocurre
        url = url.replace(`${this.bucketName}/${this.bucketName}/`, `${this.bucketName}/`);
      }
      
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return '';
    }
  }

  async deleteFile(url: string): Promise<void> {
    const key = this.getKeyFromUrl(url);

    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Failed to delete file from S3');
    }
  }

  private getKeyFromUrl(url: string): string {
    if (!url) return '';
    
    // Si la URL tiene query params (es una URL firmada), los quitamos primero
    const cleanUrl = url.split('?')[0];
    const urlParts = cleanUrl.split('/');
    
    // Buscamos la carpeta feeds/ o gallery/ que es donde empieza nuestra key
    const feedsIndex = urlParts.indexOf('feeds');
    if (feedsIndex > -1) return urlParts.slice(feedsIndex).join('/');
    
    const galleryIndex = urlParts.indexOf('gallery');
    if (galleryIndex > -1) return urlParts.slice(galleryIndex).join('/');

    const avatarsIndex = urlParts.indexOf('avatars');
    if (avatarsIndex > -1) return urlParts.slice(avatarsIndex).join('/');

    return urlParts[urlParts.length - 1];
  }
}