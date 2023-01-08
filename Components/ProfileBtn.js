import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { useEffect, useState } from "react";

export function ProfileBtn({ navigation, route }) {
  return (
    <TouchableOpacity
      style={css.ProfileGoBtn}
      onPress={() =>
        navigation.navigate("Profile", { user: route.params.user })
      }
    >
      <Icon name="user" type="antdesign" size={30} color="#000" />
    </TouchableOpacity>
  );
}

const css = StyleSheet.create({
  ProfileGoBtn: {
    marginRight: 10,
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
});
