import { auth } from './firebaseConfig';

export async function signUpUser(email, password, name) {
  return { uid: 'demo-uid', email, displayName: name };
}

export async function signInUser(email, password) {
  return { uid: 'demo-uid', email, displayName: 'Demo User' };
}

export async function sendPasswordReset(email) {
  return true;
}

export async function signOutUser() {
  return true;
}
