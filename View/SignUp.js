import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { signUp } from "../Database/UserAuth";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export function SignUpScreen({ navigation }) {
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
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={css.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        value={password}
      />
      <Button
        title={"Sign Up"}
        onPress={() => signUp(email, password, navigation)}
      />
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
