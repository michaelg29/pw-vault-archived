import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

import { styles } from './styles';

function readData(pw, props) {
	let path = `${FileSystem.documentDirectory}/pw.json`;
	global.data = []

	FileSystem.getInfoAsync(path).then((info) => {
		if (info.exists) {
			// file exists, read
			FileSystem.readAsStringAsync(path).then((content) => {
				global.data = JSON.parse(content);
				props.navigation.navigate('Dashboard');
			});
		} else {
			// file doesn't exist, create
			let content = JSON.stringify([]);
			FileSystem.writeAsStringAsync(path, content).then(() => {
				global.data = [];
				props.navigation.navigate('Dashboard');
			});
		}
	});
}

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
			// write password to file
			FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}/pw.txt`, digest).then(() => {
				readData(text, this.props);
			});
		});
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
					readData(text, this.props);
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
