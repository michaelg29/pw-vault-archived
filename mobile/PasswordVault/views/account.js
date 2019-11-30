import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import * as FileSystem from 'expo-file-system';
import { styles } from './styles';

export class CreateAccount extends Component {
    state = {
        text: "",
    };

    _submitPw(text) {
        alert(text);
    }

    render() {
        return (
            <View style={styles.container_center}>
                <Text style={styles.header}>Enter a Password</Text>
                <Text>Must be 16 characters</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(_text) => this.setState({text: _text})}
                    value={this.state.text}
                    secureTextEntry={true}
                    maxLength={16}
                />
                <Button
                    onPress={this._submitPw(this.state.text)}
                    title="Create Account"
                />
            </View>
        );
    }
}

export class Login extends Component {
    render() {
        return (
            <View></View>
        );
    }
}

export class AccountSettings extends Component {
    render() {
        return (
            <View></View>
        );
    }
}