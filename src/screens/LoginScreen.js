import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity} from "react-native";

import { connect } from 'react-redux'
import { profileChanged, tokenChanged } from '../redux/actions/AuthActions'

import Database from "../database/Database";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";
import { TextButton } from "../components/TextButton";
import Appconfig from '../AppConfig'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secureTextEntry: true,
      error: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
  
          <View style={styles.actionBar}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>Panasonic AC Smart Cloud</Text>
          </View>
          <View style={styles.content}>
            <Heading style={styles.title}>Login</Heading>
            <Text style={{color: Appconfig.colors.gray}}>Please login to continue.</Text>
            
            <TextInput
              style={{
                marginTop: 40,
                borderColor: Appconfig.colors.main_button_color,
                borderWidth: 2,
                borderRadius: 20,
                height: 40,
                paddingHorizontal: 10,
              }}
              placeholder="User ID"
              placeholderTextColor={Appconfig.colors.main_button_color}
            />
  
            <View style={{marginTop: 10, justifyContent: 'center'}}>
              <TextInput
                style={{
                  borderColor: Appconfig.colors.main_button_color,
                  borderWidth: 2,
                  borderRadius: 20,
                  height: 40,
                  paddingHorizontal: 10
                }}
                placeholder="Password"
                placeholderTextColor={Appconfig.colors.main_button_color}
                secureTextEntry={this.state.secureTextEntry}
              />
              <TouchableOpacity 
                onPress={()=>{
                  this.setState({secureTextEntry: !this.state.secureTextEntry})
                }}
                style={{
                    position: 'absolute',
                    width: 35,
                    height: 30,
                    right: 15,
                    paddingHorizontal: 5,
                    justifyContent: 'center'
                  }}>
                <Image
                  style={{
                    width: 25,
                    height: undefined,
                    aspectRatio: 100/64,
                  }}
                  source={require('../resources/ic_eye.png')}
                />
              </TouchableOpacity>
            </View>
            
  
            <AppButton
              style={styles.loginButton}
              title={"Login"}
              onPress={() => {
                Database.setSessionToken("Token");
                this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: "MainStack" }],
                });
              }}
            />
            <TextButton
              title={"Have u an account? Create one"}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  actionBar: {
    width: Appconfig.dimensions.screenWidth,
    height: 50,
    backgroundColor: Appconfig.colors.actionbar_color,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 50,
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
});

const mapStateToProps = ({ auth }) => {
  const { token, pushToken } = auth
  return {
    token,
    pushToken
  }
}

export default connect(mapStateToProps, { tokenChanged, profileChanged })(
  LoginScreen
)