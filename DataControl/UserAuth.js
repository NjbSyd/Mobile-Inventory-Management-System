import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./FirebaseConfig";
import { Alert, ToastAndroid } from "react-native";

const auth = getAuth(app);
export function signUp(email, password, navigation) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      ToastAndroid.show("User Registered", ToastAndroid.SHORT);
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
      navigation.navigate("Home", { user: userCredential.user });
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
