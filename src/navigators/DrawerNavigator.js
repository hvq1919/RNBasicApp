import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { AboutStackNavigator } from "./StackNavigator";
import { BottomTabNavigator } from "./TabNavigator";
import { SlideMenu } from "../screens/SlideMenu";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <SlideMenu {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="About" component={AboutStackNavigator} />
      <Drawer.Screen name="About2" component={AboutStackNavigator} />
      <Drawer.Screen name="About3" component={AboutStackNavigator} />
    </Drawer.Navigator>
  );
};
