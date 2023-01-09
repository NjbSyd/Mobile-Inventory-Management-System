import { View } from "react-native";
import { SearchBarAndroid } from "@rneui/base/dist/SearchBar/SearchBar-android";

export function Search({ navigation }) {
  return (
    <View>
      <SearchBarAndroid />
    </View>
  );
}
