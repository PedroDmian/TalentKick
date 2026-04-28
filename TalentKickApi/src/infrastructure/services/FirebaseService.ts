import * as admin from 'firebase-admin';

// Inicializa Firebase Admin SDK solo una vez si no ha sido inicializado ya.
// Esto permite que el SDK detecte automáticamente GOOGLE_APPLICATION_CREDENTIALS.
if (!admin.apps.length) {
  admin.initializeApp();
}

export class FirebaseService {
  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verificando token de Firebase:', error);
      throw new Error('Invalid Firebase Token');
    }
  }

  // Útil para extraer info básica de Google/Apple
  async getUserInfoFromToken(idToken: string) {
    const decodedToken = await this.verifyIdToken(idToken);
    return {
      email: decodedToken.email,
      name: decodedToken.name || (decodedToken as any).display_name,
      avatar: decodedToken.picture || (decodedToken as any).photo_url,
      firebaseUid: decodedToken.uid,
    };
  }
}

