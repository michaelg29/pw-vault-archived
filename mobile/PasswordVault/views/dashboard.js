import React, { Component } from 'react';
import { View, Text, Button, SectionList } from 'react-native';

import { styles } from './styles';

import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    _parseData() {
        let list = [];

        if (global.data && global.data !== []) {
            global.data.forEach((info, index) => {
                let sorter = info.general.name.charAt(0).toUpperCase();

                let sectionFound = false;

                list.forEach((section) => {
                    if (sorter === section.title) {
                        list[index].data.push(info.general.name);
                        sectionFound = true;
                    }
                });

                if (!sectionFound) {
                    // create section for site
                    list.push({
                        title: sorter,
                        data: [info.general.name]
                    })
                }
            });
        }

        //Object.keys(list).forEach((item) => list[item].sort());

        return list;
    }

    gotoPage(name) {

    }

    _renderItem({item}) {
        return (
            <Button
                style={styles.listButton}
                onPress={this.gotoPage(item)}
                title={item}
            />
        );
    }

    _renderHeader({key}) {
        return (
            <Text style={styles.listHeader}>{key}</Text>
        );
    }

    render() {
        return (
            <View>
                <Button style={styles.navButton}
                    onPress={() => this.props.navigation.navigate("CreateCredentials")}
                    title={"Create Credentials"}
                />

                <SectionList
                    sections={this._parseData()}
                    renderItem={({item, index, section}) => <Button 
                                                                key={index}
                                                                title={item}
                                                                onPress={this.gotoPage({item})}/>}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{fontWeight: 'bold'}}>{title}</Text>
                    )}
                    keyExtractor={(item, index) => item + index}
                />

            </View>
        );
    }
}