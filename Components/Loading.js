import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export function LoadingIndicator() {
  return (
    <View style={css.main}>
      <Text style={css.text}>Welcome</Text>
      <ActivityIndicator color={"#F0941F"} size={100} />
      <Text style={css.text}>Loading . . .</Text>
      <Text style={css.text}>Please Wait !!</Text>
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
