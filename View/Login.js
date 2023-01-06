import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { signIn } from "../Database/UserAuth";

export function LoginScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail("");
        setPassword("");
      };
    }, [])
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={css.MainContainer}>
      <View style={css.InnerContainer}>
        <TextInput
          style={css.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={css.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity
          style={css.showPass}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={css.showPassTxt}>
            {showPassword ? "Show " : "Hide "}Password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={css.LoginBtn}
          onPress={() => signIn(email, password, navigation)}
        >
          <Text style={css.LoginBtnTxt}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ height: 45, paddingTop: 15 }}>
            Not have an account?
          </Text>
          <TouchableOpacity
            style={css.SignUpBtn}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={css.SignUpBtnTxt}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#90A19D",
    flex: 1,
    alignContent: "center",
  },
  InnerContainer: {
    marginHorizontal: 20,
    paddingVertical: 100,
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
  LoginBtn: {
    backgroundColor: "#363432",
    margin: 10,
    height: 45,
    width: 250,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  LoginBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  SignUpBtn: {
    marginVertical: 10,
    height: 45,
    width: 80,
    borderRadius: 10,
    alignSelf: "center",
  },
  SignUpBtnTxt: {
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
