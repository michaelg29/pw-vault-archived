import React, { Component } from 'react';
import { View, Text, TextInput, Button, SectionList } from 'react-native';
import { styles } from './styles';

import { encrypt, decrypt } from '../utils/vigenere';

import { FileSystem } from 'expo-file-system';

export class CredentialsView extends Component {
	constructor(props) {
		super(props);
		this.name = this.props.navigation.getParam('name', 'undefined');
		this.info = global.data[this._getInfo(this.name)];
	}

	_getInfo(name) {
		for (var i = 0, len = global.data.length; i < len; i++) {
			if (global.data[i].general.name === name) {
				return i;
			}
		}
	}

	_parseData() {
		let data = [];

		for (var key in this.info) {
			if (this.info.hasOwnProperty(key)) {
				let section = {
					title: key,
					data: []
				};

				for (var property in this.info[key]) {
					if (this.info[key].hasOwnProperty(property)) {
						let pair = [ property, this.info[key][property] ];
						section.data.push(pair);
					}
				}

				data.push(section);
			}
		}

		return data;
	}

	render() {
		return (
			<View>
				<Text>{this.name}</Text>

				<SectionList
					sections={this._parseData()}
					renderItem={({ item, index, section }) => (
						<View>
							<Text key={`text:${index}`}>{item[0]}</Text>
							<TextInput key={`input:${index}`} placeholder={item[0]} value={item[1]} />
						</View>
					)}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={{ fontWeight: 'bold' }}>{title}</Text>
					)}
					keyExtractor={(item, index) => item + index}
				/>
			</View>
		);
	}
}

export class CredentialInput extends Component {
	constructor(props) {
		super(props);

		this.state = { value: '' };
	}

	getValue() {
		return this.state.value;
	}

	render() {
		return (
			<View>
				<Text>{this.props.name}:</Text>
				<TextInput
					style={styles.textInput}
					placeholder={this.props.name}
					onChangeText={(_text) => this.setState({ value: _text })}
					value={this.state.value}
				/>
			</View>
		);
	}
}

export class CreateCredentialsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {}
		};

		this.inputs = {
			general: {
				name: React.createRef()
			},
			account: {
				password: React.createRef()
			}
		};
	}

	_submit() {
		let data = {};

		Object.keys(this.inputs).forEach((section) => {
			data[section] = {};
			Object.keys(this.inputs[section]).forEach((name) => {
				let value = this.inputs[section][name].current && this.inputs[section][name].current.getValue();
				data[section][name] = section === 'general' ? value : encrypt(value, global.pw);
			});
		});

		global.data.push(data);
		FileSystem.writeAsStringAsync(
			`${FileSystem.documentDirectory}/pw.json`,
			JSON.stringify(global.data)
		).then(() => {
			this.props.navigation.navigate('Dashboard', { ready: true });
		});
	}

	render() {
		return (
			<View>
				<Text style={styles.header}>Create credentials</Text>
				<View>
					<Text>General Info:</Text>
					{Object.keys(this.inputs['general']).map((key, index) => (
						<CredentialInput key={index} section={'general'} name={key} ref={this.inputs['general'][key]} />
					))}
				</View>
				<View>
					<Text>Account Info:</Text>
					{Object.keys(this.inputs['account']).map((key, index) => (
						<CredentialInput key={index} section={'account'} name={key} ref={this.inputs['account'][key]} />
					))}
				</View>
				<Button onPress={this._submit.bind(this)} title={'Add Credentials'} />
			</View>
		);
	}
}
