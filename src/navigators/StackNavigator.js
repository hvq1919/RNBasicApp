import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/HomeScreen";
import { JobDetailScreen } from "../screens/JobDetailScreen";
import { AboutScreen } from "../screens/AboutScreen";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "purple",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  //headerShown: false,
};

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={JobDetailScreen} />
    </Stack.Navigator>
  );
};

export const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};
