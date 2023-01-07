import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { addNewItem } from "../Database/DataControl";
export function ItemEntry({ navigation, route }) {
  const [item, setItem] = useState({});
  return (
    <View>
      <Text>Name</Text>
      <TextInput
        placeholder={"Enter Item Name"}
        onChangeText={(text) => {
          setItem({ ...item, name: text });
        }}
      />
      <Text>Quantity</Text>
      <TextInput
        placeholder={"Enter Item Quantity"}
        keyboardType={"numeric"}
        onChangeText={(text) => {
          setItem({ ...item, quantity: text });
        }}
      />
      <Text>Price</Text>
      <TextInput
        placeholder={"Enter Item Price"}
        keyboardType={"numeric"}
        onChangeText={(text) => {
          setItem({ ...item, price: text });
        }}
      />
      <Text>Supplier</Text>
      <TextInput
        placeholder={"Enter Item Supplier Name"}
        onChangeText={(text) => {
          setItem({ ...item, supplier: text });
        }}
      />
      <TouchableOpacity
        onPress={() => {
          addNewItem(route.params.uid, item).then((r) => {
            navigation.navigate("Home", { uid: route.params.uid });
          });
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
