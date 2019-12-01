import React, { Component } from 'react';
import { View } from 'react-native';

import { CreateAccount, Login } from './views/account';
import { Dashboard } from './views/dashboard';
import { CredentialsView } from './views/credentials';

import { styles } from './views/styles';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as FileSystem from 'expo-file-system';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {new: true, ready: false};
  }

  async componentDidMount() {
    FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/pw.txt`).then((tmp) => {
      this.setState({new: !tmp.exists, ready: true});
    });
  }

  render() {
    if (this.state.ready) {
      if (this.state.new) {
        // create account
        return (
          <View style={styles.container}>
            <CreateAccount navigation={this.props.navigation}/>
          </View>
        );
      } else {
        // login
        return (
          <View style={styles.container}>
            <Login navigation={this.props.navigation}/>
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

const AppNavigator = createStackNavigator({
  Primary: {
    screen: App
  },
  Dashboard: {
    screen: Dashboard
  },
  CredentialsView: {
    screen: CredentialsView
  }
});

export default createAppContainer(AppNavigator);