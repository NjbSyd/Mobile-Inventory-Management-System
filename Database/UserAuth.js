import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { app, fsDatabase } from "./FirebaseConfig";
import {
  getProfilePic,
  getUserInfo,
  readData,
  uploadProfilePic,
} from "./DataControl";
import { Alert, ToastAndroid } from "react-native";
import { storeData } from "./AsyncStorageControl";

const auth = getAuth(app);
export function signUp(info, navigation, image) {
  createUserWithEmailAndPassword(auth, info.email, info.password)
    .then((userCredential) => {
      ToastAndroid.show("User Registered", ToastAndroid.SHORT);
      uploadProfilePic(userCredential.user.uid, image);
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
  function loadData(uid) {
    getUserInfo(uid).then((r) => {
      storeData("@user_key", r).then((r) => console.log("User info stored"));
    });
    readData(uid).then((dataSet) => {
      storeData("@data_key", dataSet).then((r) => console.log("Data stored"));
    });
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const uid = userCredential.user.uid;
      loadData(uid);
      navigation.navigate("Profile");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorCode, errorMessage);
    });
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
