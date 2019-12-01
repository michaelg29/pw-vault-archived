import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class CredentialsView extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.navigation.getParam('name', 'undefined')}</Text>
            </View>
        );
    }
}