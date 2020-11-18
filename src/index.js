import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { SplashScreen } from "./screens/SplashScreen";
import { AuthStackNavigator } from "./navigators/AuthStackNavigator";
import { DrawerNavigator } from "./navigators/DrawerNavigator";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name={"Splash"} component={SplashScreen} />
        <RootStack.Screen
          name={"AuthStack"}
          component={AuthStackNavigator}
          options={{
            animationEnabled: false,
          }}
        />
        <RootStack.Screen name={"MainStack"} component={DrawerNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
