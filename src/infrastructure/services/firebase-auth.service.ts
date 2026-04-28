import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

export class FirebaseAuthService {
  constructor() {
    GoogleSignin.configure({
      // webClientId: 'YOUR_WEB_CLIENT_ID', // Reemplazar con el ID de cliente web de la consola de Firebase
    });
  }

  async signInWithGoogle(): Promise<string> {
    try {
      // Get the users ID token
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;

      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID Token');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);

      // Get the ID Token from the Firebase user to send to our backend
      const firebaseIdToken = await userCredential.user.getIdToken();

      return firebaseIdToken;
    } catch (error) {
      console.error('Firebase Google Sign-In Error:', error);
      throw error;
    }
  }

  async signInWithApple(): Promise<string> {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple Auth is supported
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed: No Identity Token');
      }

      // Create an Apple credential with the token
      const appleCredential = auth.AppleAuthProvider.credential(
        appleAuthRequestResponse.identityToken,
        appleAuthRequestResponse.nonce
      );

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(appleCredential);

      // Get the ID Token from the Firebase user to send to our backend
      const firebaseIdToken = await userCredential.user.getIdToken();

      return firebaseIdToken;
    } catch (error) {
      console.error('Firebase Apple Sign-In Error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await auth().signOut();
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.signOut();
    }
  }
}
