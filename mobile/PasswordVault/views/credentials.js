import React, { Component } from 'react';
import { NativeModules, Platform, View, Text, TextInput, Button } from 'react-native';
import { styles } from './styles';

var AES = require('react-native-aes');
var Buffer = require('buffer').Buffer;

import { FileSystem } from 'expo-file-system';

import { Row, Col, Grid } from 'react-native-easy-grid';

export class CredentialsView extends Component {
	render() {
		return (
			<View>
				<Text>{this.props.navigation.getParam('name', 'undefined')}</Text>
			</View>
		);
	}
}

export class CredentialInput extends Component {
    constructor(props) {
        super(props);

        this.state = {value: ''};
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return(
            <View>
                <Text>{this.props.name}:</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={this.props.name}
                    onChangeText={(_text) => this.setState({value: _text})}
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
        }

        this.inputs = {
            "general": {
                "name": React.createRef()
            },
            "account": {
                "password": React.createRef()
            }
        };
    }

    _submit() {
        let data = {};

        Object.keys(this.inputs).forEach((section) => {
            data[section] = {};
            Object.keys(this.inputs[section]).forEach((name) => {
                let value = this.inputs[section][name].current && this.inputs[section][name].current.getValue();
                console.log("73",value);
                if (section == "general") {
                    data[section][name] = value;
                } else {
                    console.log("77",value);
                    AES.encryptWithCipher(
                        "AES-256-CBC",
                        Buffer.from(value),
                        `${global.pw}${global.pw}`,
                        (err, encrypted) => {
                            data[section][name] = encrypted.ciphertext;
                            data[section][`${name}_iv`] = encrypted.iv;

                            //console.log(data[section][name]);
                        }
                    );
                }
            });
        });

        global.data.push(this.state.data);
    }

	render() {
		return (
			<View>
				<Text style={styles.header}>Create credentials</Text>
                <View>
					<Text>General Info:</Text>
                    {
                        Object.keys(this.inputs["general"]).map((key, index) => (
                            <CredentialInput key={index} section={"general"} name={key} ref={this.inputs["general"][key]}/>
                        ))
                    }
				</View>
                <View>
					<Text>Account Info:</Text>
                    {
                        Object.keys(this.inputs["account"]).map((key, index) => (
                            <CredentialInput key={index} section={"account"} name={key} ref={this.inputs["general"][key]}/>
                        ))
                    }
				</View>
                <Button
                    onPress={this._submit.bind(this)}
                    title={"Add Credentials"}
                />
			</View>
		);
	}
}
