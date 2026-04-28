import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TalentKick API',
      version: '1.0.0',
      description: 'API de backend para TalentKick con documentación modular',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Cargamos los esquemas de las entidades y los archivos YAML de rutas
  apis: [
    './src/domain/entities/*.ts',
    './docs/swagger/routes/*.yaml'
  ],
};

export const swaggerSpec = swaggerJsDoc(options);
