import { TouchableOpacity, StyleSheet } from "react-native";
import { logOut } from "../Database/UserAuth";
import { Icon } from "@rneui/themed";

export function Logout({ navigation }) {
  return (
    <TouchableOpacity style={css.logOutBtn} onPress={() => logOut(navigation)}>
      <Icon name="log-out" type="entypo" size={30} color="#000" />
    </TouchableOpacity>
  );
}

const css = StyleSheet.create({
  logOutBtn: {
    marginLeft: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "180deg" }],
  },
});
