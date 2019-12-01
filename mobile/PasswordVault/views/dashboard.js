import React, { Component } from 'react';
import { View, Text, Button, SectionList } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { ready: false, list: [] };
    }

    _parseData() {
        if (global.data !== []) {
            global.data.array.forEach((info) => {
                let sorter = info.name.charAt(0).toUpperCase();

                let sectionFound = false;

                this.state.list.forEach((section) => {
                    if (sorter === section.title) {
                        section.data.push(info.name);
                        sectionFound = true;
                    }
                });

                if (!sectionFound) {
                    // create section for site
                    this.state.list.push({
                        title: sorter,
                        data: [info.name]
                    })
                }
            });
        }
    }

    async componentDidMount() {
        let path = `${FileSystem.documentDirectory}/pw.json`;

        FileSystem.getInfoAsync(path).then((info) => {
            if (info.exists) {
                // file exists, read
                FileSystem.readAsStringAsync(path).then((content) => {
                    global.data = JSON.parse(content);
                    this.setState({ ready: true });
                });
            } else {
                // file doesn't exist, create
                let content = JSON.stringify([]);
                FileSystem.writeAsStringAsync(path, content).then(() => {
                    global.data = [];
                    this.setState({ ready: true});
                });
            }
        });
    }

    gotoPage(name) {

    }

    render() {
        return (
            <View>
                <SectionList
                    sections={this.state.data}
                    renderItem={({name}) => <Button
                                                style={styles.listButton}
                                                onPress={this.gotoPage(name)}
                                                title={name}
                                            />}
                    renderSectionHeader={({section}) => <Text style={styles.listHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}