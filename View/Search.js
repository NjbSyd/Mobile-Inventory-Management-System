import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Icon, SearchBar } from "@rneui/themed";
import { Options } from "../Components/Selector";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getData } from "../Database/AsyncStorageControl";
import { searchData } from "../Database/DataControl";
import { ItemsSummary } from "../Components/ItemsSummary";

export function Search({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      getData("@user_key").then((r) => {
        setUid(r.uid);
      });
    }, [])
  );

  function search(id, field, value) {
    value = value.trim();
    setLoading(true);
    searchData(id, field, value).then((r) => {
      setData(r);
      setDataLoaded(true);
      setLoading(false);
    });
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [option, setOption] = useState("name");
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <View style={css.mainContainer}>
      <TouchableOpacity
        style={css.BtnFloat}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" type={"entypo"} size={30} color="#363432" />
      </TouchableOpacity>
      <View style={css.searchBarContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
          style={css.searchBar}
          onSubmitEditing={() => {
            search(uid, option, searchQuery);
          }}
        />
        <Options option={option} setOption={setOption} />
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
        {dataLoaded && data.length > 0 ? (
          <ItemsSummary data={data} navigation={navigation} />
        ) : loading ? (
          <View
            style={{
              height: 400,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={60} color="#fff" />
          </View>
        ) : (
          <Text style={{ color: "#fff", fontSize: 40, alignSelf: "center" }}>
            No Data Found!!
          </Text>
        )}
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#90A19D",
  },
  searchBar: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    borderColor: "#000",
    width: "70%",
    height: 50,
    borderWidth: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
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
