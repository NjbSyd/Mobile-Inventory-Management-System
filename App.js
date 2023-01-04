import "react-native-gesture-handler";
import { Button, Text, TextInput, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { signIn, signUp, logOut } from "./DataControl/UserAuth";
import { useState } from "react";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute={LoginScreen}>
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

function HomeScreen({ navigation, route }) {
  console.log(route.params.user);
  return (
    <View>
      <Text>Hi! welcome home {route.params.user.email}</Text>
      <Button title={"Log Out"} onPress={() => logOut(navigation)} />
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
