import { useCallback, useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { Text } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import { addNewItem, removeDoc, updateData } from "../Database/DataControl";
import { Icon } from "@rneui/themed";
import { getData } from "../Database/AsyncStorageControl";

export function Details({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      setInfo(route.params.info);
      getUid().then((r) => r);
    }, [])
  );
  const [uid, setUid] = useState("");
  const [info, setInfo] = useState(route.params.info);
  const [edit, setEdit] = useState(false);
  async function getUid() {
    await getData("@user_key").then((r) => {
      setUid(r.uid);
    });
  }

  function handleSubmit() {
    if (info.name && info.quantity && info.price && info.supplier) {
      if (parseInt(info.quantity) > 0 && parseInt(info.price) > 0) {
        let newItem = {
          name: info.name,
          quantity: parseInt(info.quantity),
          price: parseInt(info.price),
          supplier: info.supplier,
          documentId: info.documentId,
        };
        updateData(uid, newItem).then((r) => {
          navigation.navigate("Home");
        });
      } else {
        ToastAndroid.show(
          "Quantity and Price must be greater than 0",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
    }
  }
  return (
    <View style={css.MainContainer}>
      <ScrollView style={css.InnerContainer}>
        <Text style={css.label}>Item ID</Text>
        <TextInput style={css.input} value={info.documentId} editable={false} />
        <Text style={css.label}>Name</Text>
        <TextInput
          style={css.input}
          value={info.name}
          editable={edit}
          onChangeText={(text) => setInfo({ ...info, name: text })}
        />
        <Text style={css.label}>Quantity</Text>
        <TextInput
          style={css.input}
          value={info.quantity.toString()}
          editable={edit}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, "");
            setInfo({ ...info, quantity: text });
          }}
        />
        <Text style={css.label}>Price</Text>
        <TextInput
          style={css.input}
          value={info.price.toString()}
          editable={edit}
          keyboardType={"numeric"}
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, "");
            setInfo({ ...info, price: text });
          }}
        />
        <Text style={css.label}>Supplier</Text>
        <TextInput
          style={css.input}
          value={info.supplier}
          editable={edit}
          onChangeText={(text) => setInfo({ ...info, supplier: text })}
        />
        {edit ? (
          <TouchableOpacity style={css.Btn} onPress={() => handleSubmit()}>
            <Text style={css.BtnTxt}>Save</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={css.Btn}
              onPress={() => {
                removeDoc(uid, info.documentId).then((r) => {
                  navigation.navigate("Home");
                });
              }}
            >
              <Icon name="trash" type={"entypo"} size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={css.Btn}
              onPress={() => {
                setEdit(true);
              }}
            >
              <Icon name="edit" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={css.Btn}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Icon name="home" type={"entypo"} size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
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
    marginVertical: 20,
    paddingVertical: 20,
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
    color: "black",
  },
  Btn: {
    backgroundColor: "#363432",
    padding: 10,
    margin: 15,
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
