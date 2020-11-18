import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Database from "../database/Database";

import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";
import { TextButton } from "../components/TextButton";

export function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>LOGIN</Heading>
      <Input
        style={styles.input}
        placeholder={"Email"}
        keyboardType={"email-address"}
      />
      <Input style={styles.input} placeholder={"Password"} secureTextEntry />
      <AppButton
        style={styles.loginButton}
        title={"Login"}
        onPress={() => {
          Database.setSessionToken("Token");
          navigation.reset({
            index: 0,
            routes: [{ name: "MainStack" }],
          });
        }}
      />
      <TextButton
        title={"Have u an account? Create one"}
        onPress={() => {
          navigation.navigate("Register");
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
  loginButton: {
    marginVertical: 32,
  },
});
