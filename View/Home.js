import { useEffect, useState } from "react";
import { readData } from "../Database/DataControl";
import { LoadingIndicator } from "../Components/Loading";
import { ScrollView, Text, View } from "react-native";
import { ItemsSummary } from "../Components/ItemsSummary";
import { Logout } from "../Components/Logout";

export function HomeScreen({ navigation, route }) {
  useEffect(() => {
    loadData();
  }, []);
  function loadData() {
    readData(uid).then((dataSet) => {
      setData([...dataSet]);
      setDataLoaded(true);
    });
  }
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uid, setUid] = useState(route.params.uid);

  return !dataLoaded ? (
    <LoadingIndicator />
  ) : (
    <View>
      <ScrollView>
        <Text>Hi! welcome home {uid}</Text>
        <ItemsSummary data={data} />
      </ScrollView>
      <Logout navigation={navigation} />
    </View>
  );
}
