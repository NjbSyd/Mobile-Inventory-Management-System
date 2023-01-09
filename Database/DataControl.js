import { fsDatabase, storage } from "./FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastAndroid } from "react-native";
import { storeData } from "./AsyncStorageControl";

export async function readData(uid) {
  const data = [];
  await getDocs(collection(fsDatabase, uid)).then((query) => {
    query.forEach((doc, index) => {
      data.push(doc.data());
    });
    for (let i = 0; i < data.length; i++) {
      data[i].documentId = query.docs[i].id;
    }
  });
  return data;
}

export async function searchData(uid, field, value) {
  const data = [];
  const q = query(collection(fsDatabase, uid), where(field, "==", value));
  await getDocs(q)
    .then((query) => {
      query.forEach((doc, index) => {
        data.push(doc.data());
      });
      for (let i = 0; i < data.length; i++) {
        data[i].documentId = query.docs[i].id;
      }
    })
    .catch((e) => {
      ToastAndroid.show("No Data Found!!", ToastAndroid.SHORT);
    });
  return data;
}

export async function addNewItem(uid, data) {
  await addDoc(collection(fsDatabase, uid), data).then(async () => {
    ToastAndroid.show("Item Added", ToastAndroid.SHORT);
    await loadData(uid).then((r) => {
      console.log("Data reloaded after adding " + data.name);
    });
  });
}

export async function removeDoc(uId, docId) {
  const docRef = await doc(fsDatabase, uId, docId);
  await deleteDoc(docRef)
    .then(async () => {
      ToastAndroid.show("Document successfully deleted!", ToastAndroid.SHORT);
      await loadData(uId).then((r) => {
        console.log("Data reloaded after deleting " + docId);
      });
    })
    .catch((error) => {
      ToastAndroid.show("Error removing document: ", ToastAndroid.SHORT);
    });
}

export async function updateData(uid, data) {
  const docId = data.documentId;
  const docRef = doc(fsDatabase, uid, docId);
  await setDoc(docRef, {
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    supplier: data.supplier,
  })
    .then(async () => {
      ToastAndroid.show("Item updated", ToastAndroid.SHORT);
      await loadData(uid).then((r) => {
        console.log("Data reloaded after updating " + data.name);
      });
    })
    .catch((error) => {
      ToastAndroid.show(
        "Error updating document: ".concat(error),
        ToastAndroid.SHORT
      );
    });
}

export async function getUserInfo(uid) {
  let userInfo = {};
  const q = query(collection(fsDatabase, "users"), where("uid", "==", uid));
  await getDocs(q).then((querySnapshot) => {
    userInfo = querySnapshot.docs[0].data();
  });
  return userInfo;
}

export async function uploadProfilePic(uid, image) {
  const imgRef = ref(storage, `profiles/${uid}`);
  const profile = await fetch(image);
  const imageBytes = await profile.blob();
  uploadBytes(imgRef, imageBytes).then((snapshot) => {
    ToastAndroid.show("Profile Picture Uploaded", ToastAndroid.SHORT);
  });
}

export async function getProfilePic(uid) {
  let image = "";
  const imgRef = ref(storage, `profiles/${uid}`);
  await getDownloadURL(imgRef).then((url) => {
    image = url;
  });
  return image;
}

async function loadData(uid) {
  await getUserInfo(uid).then((r) => {
    storeData("@user_key", r).then((r) => r);
  });
  await readData(uid).then((dataSet) => {
    storeData("@data_key", dataSet).then((r) => r);
  });
  return true;
}
