import "react-native-gesture-handler";
import { LogBox, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { HomeScreen } from "./View/Home";
import { LoginScreen } from "./View/Login";
import { SignUpScreen } from "./View/SignUp";
import { Logout } from "./Components/Logout";
import * as React from "react";
import { Text } from "@rneui/base";
import { Details } from "./View/Detail";
import { ItemEntry } from "./View/ItemEntry";
import { ProfileBtn } from "./Components/ProfileBtn";
import { Profile } from "./View/Profile";
import { Search } from "./View/Search";

const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={({ navigation }) => ({
          headerLeft: () => <Logout navigation={navigation} />,
          headerRight: () => <ProfileBtn navigation={navigation} />,
        })}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: null,
            headerRight: null,
            headerStyle: {
              backgroundColor: "#90A19D",
            },
            headerTitle: () => <Text style={css.LogInTitle}>Login</Text>,
            headerTitleContainerStyle: {
              height: 80,
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerLeft: null,
            headerRight: null,
            headerStyle: {
              backgroundColor: "#90A19D",
            },
            headerTitle: () => <Text style={css.LogInTitle}>Registration</Text>,
            headerTitleContainerStyle: {
              height: 80,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => <Text style={css.mainTitle}>Home</Text>,
            headerStyle: {
              backgroundColor: "#90A19D",
            },
          })}
        />
        <Stack.Screen
          name={"ItemEntry"}
          component={ItemEntry}
          options={({ navigation, route }) => ({
            headerRight: null,
            headerLeft: null,
            headerTitle: () => (
              <Text style={[css.mainTitle, { width: 350, marginLeft: 7 }]}>
                Item Entry
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#90A19D",
            },
          })}
        />
        <Stack.Screen
          name={"Details"}
          component={Details}
          options={({ navigation, route }) => ({
            headerRight: null,
            headerLeft: null,
            headerTitle: () => (
              <Text style={[css.mainTitle, { width: 350, marginLeft: 7 }]}>
                {route.params.info.name}
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#90A19D",
            },
          })}
        />
        <Stack.Screen
          name={"Profile"}
          component={Profile}
          options={{
            headerRight: null,
            headerTitle: () => (
              <Text style={[css.mainTitle, { width: 320 }]}>Profile</Text>
            ),
            headerStyle: {
              backgroundColor: "#90A19D",
            },
          }}
        />
        <Stack.Screen
          name={"Search"}
          component={Search}
          options={{
            headerRight: null,
            headerLeft: null,
            headerTitle: () => (
              <Text style={[css.mainTitle, { width: 350, marginLeft: 7 }]}>
                Search
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#90A19D",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const css = StyleSheet.create({
  LogInTitle: {
    fontSize: 40,
    borderColor: "#90A19D",
    borderWidth: 2,
    fontWeight: "bold",
    color: "#363432",
    width: 350,
    textAlign: "center",
    marginLeft: 5,
    marginVertical: 10,
    backgroundColor: "#F0941F",
    borderRadius: 20,
    padding: 5,
    elevation: 10,
  },
  mainTitle: {
    fontSize: 20,
    borderColor: "#90A19D",
    borderWidth: 2,
    fontWeight: "bold",
    color: "#363432",
    width: 270,
    textAlign: "center",
    backgroundColor: "#F0941F",
    borderRadius: 20,
    padding: 5,
    elevation: 10,
  },
  longmainTitle: {
    fontSize: 20,
    borderColor: "#90A19D",
    borderWidth: 2,
    fontWeight: "bold",
    color: "#363432",
    width: 350,
    textAlign: "center",
    backgroundColor: "#F0941F",
    borderRadius: 20,
    padding: 5,
    elevation: 10,
  },
});
