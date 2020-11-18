import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Database from "../database/Database";

export function SlideMenu(props) {
  console.log(props.navigation);
  return (
    <View style={{ flex: 1, marginTop: 120, alignItems: "center" }}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          props.navigation.navigate("About");
        }}
      >
        <Text>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          props.navigation.navigate("About2");
        }}
      >
        <Text>About2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          props.navigation.navigate("About3");
        }}
      >
        <Text>About3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          Database.logOut();
          props.navigation.reset({
            index: 0,
            routes: [{ name: "AuthStack" }],
          });
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
