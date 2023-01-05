import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export function LoadingIndicator() {
  return (
    <View style={css.main}>
      <ActivityIndicator color={"black"} size={100} />
      <Text style={css.text}>Loading . . .</Text>
    </View>
  );
}

const css = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});
