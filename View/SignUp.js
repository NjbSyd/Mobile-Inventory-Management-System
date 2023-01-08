import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { signUp } from "../Database/UserAuth";
import ImageSelector from "../Components/ImageSelector";
import React from "react";

export function SignUpScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setInfo({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          contact: "",
        });
        setImage(null);
        setSelection(true);
      };
    }, [])
  );

  const [info, setInfo] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    name: "",
    address: "",
    contact: "",
  });
  const [isSelected, setSelection] = useState(true);
  const [image, setImage] = useState(null);
  return (
    <ScrollView style={css.MainContainer}>
      <View style={css.InnerContainer}>
        <TextInput
          style={css.input}
          placeholder="Name"
          value={info.name}
          onChangeText={(text) => setInfo({ ...info, name: text })}
        />
        <TextInput
          style={css.input}
          placeholder="Email"
          value={info.email}
          onChangeText={(text) => setInfo({ ...info, email: text })}
        />
        <TextInput
          style={css.input}
          placeholder="Contact#"
          keyboardType="numeric"
          value={info.contact}
          onChangeText={(text) => {
            if (text.length <= 11) {
              setInfo({ ...info, contact: text });
            } else {
              ToastAndroid.show(msg, ToastAndroid.SHORT);
            }
          }}
        />
        <TextInput
          style={css.input}
          placeholder="Address"
          value={info.address}
          onChangeText={(text) => setInfo({ ...info, address: text })}
        />
        <TextInput
          style={css.input}
          placeholder="Password"
          value={info.password}
          secureTextEntry={isSelected}
          onChangeText={(text) => setInfo({ ...info, password: text })}
        />
        <TouchableOpacity
          style={css.showPass}
          onPress={() => setSelection(!isSelected)}
        >
          <Text style={css.showPassTxt}>
            {isSelected ? "Show " : "Hide "}Password ?
          </Text>
        </TouchableOpacity>
        <TextInput
          style={css.input}
          placeholder="Confirm Password"
          value={info.confirmPassword}
          secureTextEntry={isSelected}
          onChangeText={(text) => setInfo({ ...info, confirmPassword: text })}
        />
        <ImageSelector image={image} setImage={setImage} />
        <TouchableOpacity
          style={css.SignUpBtn}
          onPress={() => {
            if (
              info.email &&
              info.password &&
              info.confirmPassword &&
              info.name &&
              info.address &&
              info.contact
            ) {
              if (info.password === info.confirmPassword) {
                signUp(info, navigation, image);
              } else {
                ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
              }
            } else {
              ToastAndroid.show(
                "Please fill all the fields",
                ToastAndroid.SHORT
              );
            }
          }}
        >
          <Text style={css.SignUpBtnTxt}>Sign Up</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ height: 45, paddingTop: 15 }}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={css.LoginBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={css.LoginBtnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const css = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#90A19D",
    paddingTop: 10,
    alignContent: "center",
  },
  InnerContainer: {
    marginHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#F0941F",
    borderRadius: 20,
    elevation: 12,
  },
  input: {
    height: 50,
    width: 300,
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    elevation: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  SignUpBtn: {
    backgroundColor: "#363432",
    margin: 10,
    height: 45,
    width: 250,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  SignUpBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  LoginBtn: {
    marginVertical: 10,
    height: 45,
    width: 80,
    borderRadius: 10,
    alignSelf: "center",
  },
  LoginBtnTxt: {
    color: "#363432",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 22,
  },
  showPass: {
    marginRight: 30,
  },
  showPassTxt: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#363432",
    borderRadius: 10,
    width: 100,
    alignSelf: "flex-end",
  },
});

const msg = "بس گیارہ نمبر ہو گیا😊";
