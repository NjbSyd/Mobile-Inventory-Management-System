import { useCallback, useEffect, useState } from "react";
import { readData } from "../Database/DataControl";
import { LoadingIndicator } from "../Components/Loading";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import { ItemsSummary } from "../Components/ItemsSummary";
import { Logout } from "../Components/Logout";
import { getUserInfo } from "../Database/UserAuth";
import { useFocusEffect } from "@react-navigation/native";

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
      <Text>Hi! welcome home {userInfo.name}</Text>
      <ScrollView style={{ width: 350 }}>
        <ItemsSummary data={data} navigation={navigation} />
      </ScrollView>
      <Button
        title={"Add Item"}
        onPress={() => {
          navigation.navigate("ItemEntry", { uid: uid });
        }}
      />
    </View>
  ) : (
    <View>
      <Text>No data found!!</Text>
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
});
