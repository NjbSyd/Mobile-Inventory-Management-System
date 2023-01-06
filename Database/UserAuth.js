import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, where, getDocs, query } from "firebase/firestore";
import { app, fsDatabase } from "./FirebaseConfig";
import { Alert, ToastAndroid } from "react-native";

const auth = getAuth(app);
export function signUp(info, navigation) {
  createUserWithEmailAndPassword(auth, info.email, info.password)
    .then((userCredential) => {
      ToastAndroid.show("User Registered", ToastAndroid.SHORT);
      addDoc(collection(fsDatabase, "users"), {
        name: info.name,
        email: info.email,
        contact: info.contact,
        address: info.address,
        uid: userCredential.user.uid,
      }).then((r) => r);
      navigation.navigate("Login");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorCode, errorMessage);
    });
}

export function signIn(email, password, navigation) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      ToastAndroid.show("User Logged In", ToastAndroid.SHORT);
      const uid = userCredential.user.uid;
      navigation.navigate("Home", { uid: uid });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorCode, errorMessage);
    });
}

export async function getUserInfo(uid) {
  let userInfo = {};
  const q = query(collection(fsDatabase, "users"), where("uid", "==", uid));
  await getDocs(q).then((querySnapshot) => {
    userInfo = querySnapshot.docs[0].data();
  });
  ToastAndroid.show(userInfo.name, ToastAndroid.SHORT);
  return userInfo;
}
export function logOut(navigation) {
  signOut(auth)
    .then(() => {
      ToastAndroid.show("User Logged Out", ToastAndroid.SHORT);
      navigation.popToTop();
    })
    .catch((error) => {
      Alert.alert(error);
    });
}
