import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA3cSGjpmu-SuQ1x4hthmaK5pInrD5C1d4",
  authDomain: "inventory-management-sys-37788.firebaseapp.com",
  projectId: "inventory-management-sys-37788",
  storageBucket: "inventory-management-sys-37788.appspot.com",
  messagingSenderId: "797466418517",
  appId: "1:797466418517:web:c531edd5c000e2f50a23dc"
};

const app = initializeApp(firebaseConfig);
export const fsDatabase = getFirestore(app);
