import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { addNewItem } from "../Database/DataControl";
export function ItemEntry({ navigation, route }) {
  const [item, setItem] = useState({});
  return (
    <View style={css.MainContainer}>
      <View style={css.InnerContainer}>
        <Text style={css.label}>Name</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Name"}
          onChangeText={(text) => {
            setItem({ ...item, name: text });
          }}
        />
        <Text style={css.label}>Quantity</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Quantity"}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            setItem({ ...item, quantity: text });
          }}
        />
        <Text style={css.label}>Price</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Price"}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            setItem({ ...item, price: text });
          }}
        />
        <Text style={css.label}>Supplier</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Supplier Name"}
          onChangeText={(text) => {
            setItem({ ...item, supplier: text });
          }}
        />
        <TouchableOpacity
          style={css.Btn}
          onPress={() => {
            addNewItem(route.params.uid, item).then((r) => {
              navigation.navigate("Home", { uid: route.params.uid });
            });
          }}
        >
          <Text style={css.BtnTxt}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#90A19D",
    flex: 1,
    alignContent: "center",
  },
  InnerContainer: {
    marginHorizontal: 20,
    paddingVertical: 100,
    backgroundColor: "#F0941F",
    borderRadius: 20,
    elevation: 12,
  },
  input: {
    height: 50,
    width: 300,
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    elevation: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  Btn: {
    backgroundColor: "#363432",
    margin: 10,
    height: 45,
    width: 250,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  BtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  label: {
    color: "#363432",
    alignSelf: "flex-start",
    marginLeft: 35,
    fontWeight: "bold",
    fontSize: 22,
  },
});
