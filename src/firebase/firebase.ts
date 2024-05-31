// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
import { firebaseConfig } from '@/firebase/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

// init firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
