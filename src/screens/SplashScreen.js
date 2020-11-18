import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Database from "../database/Database"
import Appconfig from "../AppConfig"

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
      <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>Panasonic AC Smart Cloud</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Appconfig.colors.actionbar_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
