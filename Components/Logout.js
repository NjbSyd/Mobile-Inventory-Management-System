import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { logOut } from "../Database/UserAuth";
import { Icon } from "@rneui/themed";

export function Logout({ navigation }) {
  return (
    <TouchableOpacity style={css.logOutBtn} onPress={() => logOut(navigation)}>
      <Image style={css.img} source={require("../Images/logout.png")} />
    </TouchableOpacity>
  );
}

const css = StyleSheet.create({
  logOutBtn: {
    marginRight: -10,
    marginLeft: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0941F",
    color: "#363432",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderWidth: 2,
    borderColor: "#90A19D",
  },
  img: {
    width: 30,
    height: 30,
  },
});
