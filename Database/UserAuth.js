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
import { removeData, storeData } from "./AsyncStorageControl";

const auth = getAuth(app);
export function signUp(info, navigation, image) {
  createUserWithEmailAndPassword(auth, info.email, info.password)
    .then((userCredential) => {
      ToastAndroid.show("User Registered", ToastAndroid.SHORT);
      uploadProfilePic(userCredential.user.uid, image).then((r) => r);

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
  async function loadData(uid) {
    await getUserInfo(uid).then((r) => {
      storeData("@user_key", r).then((r) => r);
    });
    await readData(uid).then((dataSet) => {
      storeData("@data_key", dataSet).then((r) => r);
    });
    return true;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const uid = userCredential.user.uid;
      await loadData(uid).then((r) => {
        navigation.navigate("Profile");
      });
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
      removeData("@user_key").then((r) => r);
      removeData("@data_key").then((r) => r);
      navigation.popToTop();
    })
    .catch((error) => {
      Alert.alert(error);
    });
}
