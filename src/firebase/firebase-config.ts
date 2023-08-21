// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA4OqOJai12l1Ss4iYt9hNTUQdIt4kSRGw',
  authDomain: 'anime-crud-338bc.firebaseapp.com',
  projectId: 'anime-crud-338bc',
  storageBucket: 'anime-crud-338bc.appspot.com',
  messagingSenderId: '157691930773',
  appId: '1:157691930773:web:4f8215ba9d83df958a139c'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
