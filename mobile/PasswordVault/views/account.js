import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

import { styles } from './styles';

export class CreateAccount extends Component {
	constructor(props) {
		super(props);
		this.state = { text: 'aaaaaaaaaaaaaaaa' };
	}

	_submitPw() {
		const { text } = this.state;

		// validate password
		if (text.length != 16) {
			alert('Password must be 16 characters in length');
			return null;
		}

		// hash password
		Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, text).then((digest) => {
			console.log(digest);
			// write password to file
			FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}/pw.txt`, digest).then(() => {
				this._success(text);
			});
		});
	}

	_success(password) {
		global.pw = password;
		this.props.navigation.navigate('Dashboard');
	}

	render() {
		return (
			<View style={styles.container_center}>
				<Text style={styles.header}>Enter a Password</Text>
				<Text>Must be 16 characters</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					onChangeText={(_text) => this.setState({ text: _text })}
					value=/*{this.state.text}*/{'aaaaaaaaaaaaaaaa'}
					secureTextEntry={true}
					maxLength={16}
				/>
				<Button onPress={this._submitPw.bind(this)} title="Create Account" />
			</View>
		);
	}
}

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'aaaaaaaaaaaaaaaa'
		};
	}

	_submitPw() {
		const { text } = this.state;
		
		// hash input
		Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, text).then((digest) => {
			FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}/pw.txt`).then((contents) => {
				// test hash in file against input
				if (digest === contents) {
					global.pw = text;
					this.props.navigation.navigate("Dashboard");
				} else {
					alert("Invalid password");
				}
			});
		});
	}

	render() {
		return (
			<View style={styles.container_center}>
				<Text style={styles.header}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					onChangeText={(_text) => this.setState({ text: _text })}
					value=/*{this.state.text}*/{'aaaaaaaaaaaaaaaa'}
					secureTextEntry={true}
				/>
				<Button onPress={this._submitPw.bind(this)} title="Login" />
			</View>
		);
	}
}

export class AccountSettings extends Component {
	render() {
		return <View />;
	}
}
