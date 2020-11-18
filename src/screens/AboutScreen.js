import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Input} from '../components/Input'

export function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text>AboutScreen</Text>
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
