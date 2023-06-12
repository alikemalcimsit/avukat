import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOA2g6m2nV2xMGaDuh7uR1GrnTGSs5oaw",
  authDomain: "aysenurertan.firebaseapp.com",
  projectId: "aysenurertan",
  storageBucket: "aysenurertan.appspot.com",
  messagingSenderId: "428740293446",
  appId: "1:428740293446:web:3953d27ad61df566e3eb47"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
