import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";
import { TextButton } from "../components/TextButton";

export function RegisterScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Register Screen</Heading>
      
      <Input style={styles.input} placeholder={"Password"} secureTextEntry />
      <AppButton
        style={styles.closeButton}
        title={"Close"}
        onPress={() => {
          navigation.pop()
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    marginBottom: 40,
  },
  input: {
    marginVertical: 8,
  },
  closeButton: {
    marginVertical: 32,
  },
});
