import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Database from "../database/Database"

export function SplashScreen({navigation}) {

  setTimeout(() => {
    Database.getSessionToken(data => {
      navigation.reset({
        index: 0,
        routes:[{name: data == null ? "AuthStack" : "MainStack"}]
      })
    })
  }, 3000);
  
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
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
