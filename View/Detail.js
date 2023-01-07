import { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";

export function Details({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      setInfo(route.params.info);
      return () => {
        setInfo({});
      };
    }, [])
  );
  const [info, setInfo] = useState({});

  return (
    <View>
      <Text>Details of {info.name}</Text>
    </View>
  );
}
