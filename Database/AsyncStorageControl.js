import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export async function storeData(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue).then((r) => r);
  } catch (e) {
    ToastAndroid.show("Error storing data", ToastAndroid.SHORT);
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    ToastAndroid.show("Error getting data", ToastAndroid.SHORT);
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    ToastAndroid.show("Error removing data", ToastAndroid.SHORT);
  }
}
