import { fsDatabase } from "./FirebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ToastAndroid } from "react-native";

export async function readData(uid) {
  const data = [];
  const docsSnap = await getDocs(collection(fsDatabase, uid)).then((query) => {
    query.forEach((doc, index) => {
      data.push(doc.data());
    });
  });
  return data;
}

export async function writeData(uid, data) {
  const docRef = await addDoc(collection(fsDatabase, uid), data);
  return docRef.id;
}
