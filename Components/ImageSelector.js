import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageSelector({ setImage, image }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity style={css.PickBtn} onPress={pickImage}>
        <Text style={css.PickBtnTxt}>Pick An Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const css = StyleSheet.create({
  PickBtn: {
    height: 45,
    borderRadius: 10,
    alignSelf: "center",
  },
  PickBtnTxt: {
    color: "#363432",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    fontWeight: "bold",
    fontSize: 22,
  },
});
