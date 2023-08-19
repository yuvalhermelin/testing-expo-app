import { TextInput, Text, StyleSheet, View, Image } from "react-native";
import { useState } from "react";
import { ISearchBarProps } from "../Interfaces";

const searchIcon = require("../assets/search.png");

export default function (props: ISearchBarProps) {
  const [showPlaceholder, setShowplaceholder] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.searchIcon} source={searchIcon} />
      </View>
      {showPlaceholder && !props.searchText && (
        <Text style={styles.textPlaceholder}>Search</Text>
      )}
      <TextInput
        onBlur={() => setShowplaceholder(true)}
        onFocus={() => setShowplaceholder(false)}
        onChangeText={(text) => props.setSearchText(text)}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e8ea",
    width: "92%",
    alignSelf: "center",
    height: "4%",
    marginTop: "2%",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    flexShrink: 100,
    height: "60%",
    width: "5%",
    marginLeft: "2%",
  },
  searchIcon: {
    opacity: 0.5,
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: "contain",
    aspectRatio: 1,
  },
  textPlaceholder: {
    color: "gray",
    fontSize: 15,
    marginLeft: "1%",
  },
  textInput: {
    width: "92%",
    height: "100%",
    position: "absolute",
    left: "8%",
  },
});
