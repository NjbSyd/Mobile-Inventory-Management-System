import { TouchableOpacity, StyleSheet } from "react-native";
import { logOut } from "../Database/UserAuth";
import { Icon } from "@rneui/themed";

export function Logout({ navigation }) {
  return (
    <TouchableOpacity style={css.logOutBtn} onPress={() => logOut(navigation)}>
      <Icon name="logout" type="antdesign" size={30} color="#000" />
    </TouchableOpacity>
  );
}

const css = StyleSheet.create({
  logOutBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgb(72,255,0)",
    alignItems: "center",
    justifyContent: "center",
  },
});
