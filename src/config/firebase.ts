import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { 
    getAuth, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    OAuthProvider } from "firebase/auth" // user auth methods

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCytb2K-vteJk4RhXyAdj7qJb_thi2Av14",
  authDomain: "chatmate-d177e.firebaseapp.com",
  projectId: "chatmate-d177e",
  storageBucket: "chatmate-d177e.appspot.com",
  messagingSenderId: "613468805852",
  appId: "1:613468805852:web:0d45572f51173184a8b219",
  measurementId: "G-P3YJJB98JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app) 
export const db = getFirestore(app)
export const storage = getStorage(app)

export const googleProvider = new GoogleAuthProvider() 
export const gitHubProvider = new GithubAuthProvider()
export const microsoftProvider = new OAuthProvider('microsoft.com')
microsoftProvider.setCustomParameters({
    prompt: "consent",
    tenant: "common",
})
