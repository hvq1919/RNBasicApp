import React, {Component} from "react";
import { StyleSheet, Text, View } from "react-native";

import { connect } from 'react-redux'
import { profileChanged, tokenChanged } from '../redux/actions/AuthActions'

import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { AppButton } from "../components/AppButton";
import { TextButton } from "../components/TextButton";

class RegisterScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Heading style={styles.title}>Register Screen</Heading>
        
        <Input style={styles.input} placeholder={"Password"} secureTextEntry />
        <AppButton
          style={styles.closeButton}
          title={"Close"}
          onPress={() => {
            this.props.navigation.pop()
          }}
        />
      </View>
    );
  }
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
  closeButton: {
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
  RegisterScreen
)
