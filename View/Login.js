import { useCallback, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { signIn } from "../Database/UserAuth";
import { useFocusEffect } from "@react-navigation/native";

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
  return (
    <View>
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
      />
      <Button
        title={"Sign In"}
        onPress={() => signIn(email, password, navigation)}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
}

const css = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    padding: 10,
  },
});
