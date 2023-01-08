import { useCallback, useEffect, useState } from "react";
import { readData } from "../Database/DataControl";
import { LoadingIndicator } from "../Components/Loading";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ItemsSummary } from "../Components/ItemsSummary";
import { getUserInfo } from "../Database/DataControl";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { getData, storeData } from "../Database/AsyncStorageControl";

export function HomeScreen({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      loadData().then((r) => r);
      return () => {
        setData([]);
        setDataLoaded(false);
        setMenuOpen(false);
      };
    }, [])
  );
  async function loadData() {
    const userInfo = await getData("@user_key");
    setUid(userInfo.uid);
    readData(uid).then((dataSet) => {
      setData([...dataSet]);
      storeData("@data_key", dataSet).then((r) => console.log("Data stored"));
      setDataLoaded(true);
    });
  }
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return !dataLoaded ? (
    <LoadingIndicator />
  ) : data.length > 0 ? (
    <View style={css.MainView}>
      <ScrollView style={{ width: 350 }}>
        <ItemsSummary data={data} navigation={navigation} uid={uid} />
      </ScrollView>
      {menuOpen ? (
        <>
          <TouchableOpacity
            style={[css.BtnFloat, { bottom: 130 }]}
            onPress={() => navigation.navigate("ItemEntry", { uid: uid })}
          >
            <Icon name="plus" type={"antdesign"} size={40} color="#363432" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[css.BtnFloat, { bottom: 75 }]}
            onPress={() => console.log("search")}
          >
            <Icon name="search1" type={"antdesign"} size={35} color="#363432" />
          </TouchableOpacity>
          <TouchableOpacity
            style={css.BtnFloat}
            onPress={() => setMenuOpen(!menuOpen)}
          >
            <Icon
              name="dots-three-vertical"
              type={"entypo"}
              size={30}
              color="#363432"
            />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={css.BtnFloat}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Icon
            name="dots-three-horizontal"
            type={"entypo"}
            size={30}
            color="#363432"
          />
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <View style={css.MainView}>
      <Text style={css.text}>No data found!!</Text>
      <TouchableOpacity
        style={css.AddItemBtnStatic}
        onPress={() => navigation.navigate("ItemEntry", { uid: uid })}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon name="plus" type={"antdesign"} size={30} color="#F0941F" />
          <Text style={css.AddItemBtnTxt}>Add Item?</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const css = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: "#90A19D",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  AddItemBtnStatic: {
    backgroundColor: "#363432",
    margin: 10,
    height: 45,
    width: 250,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  AddItemBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  BtnFloat: {
    backgroundColor: "#F0941F",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#90A19D",
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 10,
  },
});
