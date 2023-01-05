import "react-native-gesture-handler";
import { Button, TextInput, StyleSheet, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { signIn, signUp } from "./Database/UserAuth";
import { useEffect, useState } from "react";
import { HomeScreen } from "./View/Home";

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRoute={LoginScreen}
        screenOptions={{ headerLeft: null }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <TextInput
        style={css.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={css.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={"Sign In"}
        onPress={() => signIn(email, password, navigation)}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <TextInput
        style={css.input}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        style={css.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
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

export default App;
