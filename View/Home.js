import { useCallback, useEffect, useState } from "react";
import { readData } from "../Database/DataControl";
import { LoadingIndicator } from "../Components/Loading";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { ItemsSummary } from "../Components/ItemsSummary";
import { Logout } from "../Components/Logout";
import { getUserInfo, signIn } from "../Database/UserAuth";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

export function HomeScreen({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      loadData();
      return () => {
        setData([]);
        setDataLoaded(false);
      };
    }, [])
  );
  function loadData() {
    getUserInfo(uid).then((r) => {
      setUserInfo(r);
    });
    readData(uid).then((dataSet) => {
      setData([...dataSet]);
      setDataLoaded(true);
    });
  }
  const [userInfo, setUserInfo] = useState({});
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uid, setUid] = useState(route.params.uid);

  return !dataLoaded ? (
    <LoadingIndicator />
  ) : data.length > 0 ? (
    <View style={css.MainView}>
      <ScrollView style={{ width: 350 }}>
        <ItemsSummary data={data} navigation={navigation} uid={uid} />
      </ScrollView>
      <TouchableOpacity
        style={css.AddItemBtnFloat}
        onPress={() => navigation.navigate("ItemEntry", { uid: uid })}
      >
        <Icon name="plus" type={"antdesign"} size={40} color="#F0941F" />
      </TouchableOpacity>
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
  AddItemBtnFloat: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#363432",
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
