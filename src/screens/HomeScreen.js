import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Database from "../database/Database";
import { AppButton } from "../components/AppButton";

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <AppButton
        style={{ marginTop: 20 }}
        title={"GoTo Detail"}
        onPress={() => {
          navigation.navigate("Detail");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
