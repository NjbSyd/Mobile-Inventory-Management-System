import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ToastAndroid,
} from "react-native";
import { Icon } from "@rneui/themed";

export function ItemsSummary({ data, navigation }) {
  if (data === undefined) return null;
  return data.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={css.button}
        onPress={() => {
          ToastAndroid.show("Item Selected", ToastAndroid.SHORT);
        }}
      >
        <View style={css.topRowContainer}>
          <Text style={css.buttonText}>{item.name}</Text>
        </View>
        <View style={css.rowContainer}>
          <Text style={css.label}>
            <Icon name="email" type="entypo" size={15} color="#fff" />
            {" " + item.price}
          </Text>
          <Text style={css.label}>
            <Icon name="hash" type="feather" size={15} color="#fff" />
            {" " + item.quantity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
}

const css = StyleSheet.create({
  button: {
    borderColor: "rgba(72,255,0,0.51)",
    borderWidth: 2,
    backgroundColor: "#2a2d3e",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "rgba(72,255,0,0.2)",
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
  mfLogo: {
    width: 50,
    borderRadius: 25,
    backgroundColor: "rgba(72,255,0,0.2)",
    textAlign: "center",
    color: "white",
    textAlignVertical: "center",
    marginRight: 10,
  },
});
