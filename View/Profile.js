import { useEffect, useState } from "react";
import { getData } from "../Database/AsyncStorageControl";
import { View, Text, Image, StyleSheet, ToastAndroid } from "react-native";
import { getProfilePic } from "../Database/DataControl";

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
      <Text style={styles.nameText}>{user.name}</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Text style={styles.contactText}>{user.contact}</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    marginTop: 10,
  },
  contactText: {
    fontSize: 16,
    marginTop: 10,
  },
  coverPicContainer: {
    height: 200,
    width: "100%",
    margin: 20,
    marginBottom: 150,
    backgroundColor: "#000000",
    borderRadiusTopLeft: 10,
    borderRadiusTopRight: 10,
  },
  coverPic: {
    height: 200,
    width: "100%",
  },
});
