import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
export function ItemsSummary({ data, navigation, uid }) {
  if (data === undefined) {
    return null;
  }
  return data.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={css.button}
        onPress={() => {
          navigation.navigate("Details", { info: item, uid: uid });
        }}
      >
        <View style={css.topRowContainer}>
          <Text style={css.buttonText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  });
}

const css = StyleSheet.create({
  button: {
    backgroundColor: "#F0941F",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "#363432",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    color: "white",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  topRowContainer: {
    flexDirection: "row",
  },
});
