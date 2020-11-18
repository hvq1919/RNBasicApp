import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Appconfig from '../AppConfig'

export function Heading({ children, style, ...props }) {
  return <Text {...props} style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Appconfig.colors.main_button_color,
  },
});
