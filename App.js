import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";

import { HomeScreen } from "./View/Home";
import { LoginScreen } from "./View/Login";
import { SignUpScreen } from "./View/SignUp";
import { Logout } from "./Components/Logout";

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRoute={LoginScreen}
        screenOptions={({ navigation }) => ({
          headerLeft: () => <Logout navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerLeft: null,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
