import React, { Component } from 'react';
import { View } from 'react-native';

import { CreateAccount, Login } from './views/account';
import { styles } from './views/styles';

import * as FileSystem from 'expo-file-system';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {new: true, ready: false};
  }

  async componentDidMount() {
    FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/pw.json`).then((tmp) => {
      this.setState({new: !tmp.exists, ready: true});
    });
  }

  render() {
    if (this.state.ready) {
      if (this.state.new) {
        // create account
        return (
          <View style={styles.container}>
            <CreateAccount />
          </View>
        );
      } else {
        // login
        return (
          <View style={styles.container}>
            <Login />
          </View>
        );
      }
    } else {
      return (
        <View></View>
      );
    }
  }
}