import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { addNewItem } from "../Database/DataControl";
import { getData } from "../Database/AsyncStorageControl";
import { useFocusEffect } from "@react-navigation/native";
export function ItemEntry({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      getData("@user_key").then((data) => {
        setUid(data.uid);
      });
      return () => {
        setItem({});
      };
    }, [])
  );
  const [item, setItem] = useState({});
  const [uid, setUid] = useState();

  function handleSubmit() {
    if (
      item.name !== "" &&
      item.quantity !== "" &&
      item.price !== "" &&
      item.supplier !== ""
    ) {
      if (parseInt(item.quantity) > 0 && parseInt(item.price) > 0) {
        let newItem = {
          name: item.name,
          quantity: parseInt(item.quantity),
          price: parseInt(item.price),
          supplier: item.supplier,
        };
        addNewItem(uid, newItem).then((r) => {
          navigation.navigate("Home");
        });
      } else {
        ToastAndroid.show(
          "Quantity and Price must be greater than 0",
          ToastAndroid.SHORT
        );
        setItem({ ...item, price: "", quantity: "" });
      }
    } else {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
    }
  }

  return (
    <View style={css.MainContainer}>
      <ScrollView style={css.InnerContainer}>
        <Text style={css.label}>Name</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Name"}
          onChangeText={(text) => {
            setItem({ ...item, name: text });
          }}
          value={item.name}
        />
        <Text style={css.label}>Quantity</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Quantity"}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, "");
            setItem({ ...item, quantity: text });
          }}
          value={item.quantity}
        />
        <Text style={css.label}>Price</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Price"}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, "");
            setItem({ ...item, price: text });
          }}
          value={item.price}
        />
        <Text style={css.label}>Supplier</Text>
        <TextInput
          style={css.input}
          placeholder={"Enter Item Supplier Name"}
          onChangeText={(text) => {
            setItem({ ...item, supplier: text });
          }}
          value={item.supplier}
        />
        <TouchableOpacity style={css.Btn} onPress={() => handleSubmit()}>
          <Text style={css.BtnTxt}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingVertical: 50,
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
