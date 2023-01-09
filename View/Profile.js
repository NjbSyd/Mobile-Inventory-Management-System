import { useEffect, useState } from "react";
import { getData } from "../Database/AsyncStorageControl";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { getProfilePic } from "../Database/DataControl";
import { Icon } from "@rneui/themed";

export function Profile({ navigation }) {
  useEffect(async () => {
    const userInfo = await getData("@user_key");
    setUser(userInfo);
    console.log(userInfo);

    const profile = await getProfilePic(userInfo.uid);
    setProfilePic(profile);
    setProfilePicLoaded(true);
  }, []);
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicLoaded, setProfilePicLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.coverPicContainer}>
        <Image
          style={styles.coverPic}
          source={require("../Images/cover.jpg")}
        />
      </View>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={
            profilePicLoaded
              ? { uri: profilePic }
              : require("../Images/noImage.png")
          }
        />
      </View>
      <View style={styles.nameTextContainer}>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>
      <View style={styles.otherInfoContainer}>
        <View style={styles.otherTextContainer}>
          <Icon name="email" type={"entypo"} size={25} color="#000" />
          <Text style={styles.infoTxt}>{user.email}</Text>
        </View>
        <View style={styles.otherTextContainer}>
          <Icon name="phone" type={"antdesign"} size={25} color="#000" />
          <Text style={styles.infoTxt}>{user.contact}</Text>
        </View>
        <View style={styles.otherTextContainer}>
          <Icon name="location-pin" type={"entypo"} size={25} color="#000" />
          <Text style={styles.infoTxt}>{user.address}</Text>
        </View>
      </View>
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../Images/list.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Search");
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../Images/search.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ItemEntry");
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../Images/addlist.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#90A19D",
  },
  profilePicContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    overflow: "hidden",
    position: "absolute",
    elevation: 10,
    shadowColor: "white",
    shadowOpacity: 1,
    top: 140,
    left: 15,
    padding: 5,
    borderRadius: 120,
    backgroundColor: "#FFFFFF",
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nameText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  otherTextContainer: {
    marginLeft: 20,

    marginTop: 5,
    height: 30,
    flexDirection: "row",
    alignContent: "center",
  },
  coverPicContainer: {
    height: 200,
    width: "100%",
    marginBottom: 150,
    overflow: "hidden",
    borderRadiusTopLeft: 50,
    borderRadiusTopRight: 50,
    elevation: 5,
  },
  coverPic: {
    height: 200,
    width: "100%",
  },
  nameTextContainer: {
    width: "100%",
    marginTop: 10,
    elevation: 5,
    shadowOpacity: 1,
    shadowColor: "orange",
  },
  otherInfoContainer: {
    width: "100%",
    marginHorizontal: 5,
  },
  infoTxt: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    backgroundColor: "#363432",
    borderRadius: 10,
    height: 30,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  bottomBtnContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 10,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#363432",
    borderRadius: 50,
  },
});
