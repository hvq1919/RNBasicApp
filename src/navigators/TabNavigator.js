import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, AboutStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="About" component={AboutStackNavigator} />
      <Tab.Screen name="About2" component={AboutStackNavigator} />
    </Tab.Navigator>
  );
};