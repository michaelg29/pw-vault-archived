import React, { Component } from 'react';
import { View, Text, Button, SectionList } from 'react-native';

import { styles } from './styles';

import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { list: [], online: false };
		this.currentName = '';
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
						data: [ info.general.name ]
					});
				}
			});
		}

		//Object.keys(list).forEach((item) => list[item].sort());

		return list;
	}

	gotoPage() {
		this.props.navigation.navigate('CredentialsView', { name: this.currentName });
    }
    
    goOnline() {
        // get ip address
        // NetworkInfo.getIPAddress().then(ipAddress => {
        //     console.log(ipAddress);
        //     global.ip = ipAddress;
        //     // start web server
        //     global.ws = new WebSocket(`${ipAddress}:8020`);

        //     // generate passcode
        //     global.passcode = Math.floor((Math.random() * 8999) + 1000);

        //     // notify
        //     alert(`Web Connection Opened\nYour passcode is ${global.pw}`);
        //     this.setState({online: true});
        // });
        
    }

    goOffline() {
        this.setState({online: false});
    }

	render() {
        let cnxnButton;
        if (this.state.online) {
            cnxnButton = (<Button
                style={styles.navButton}
                onPress={() => this.goOffline()}
                title={'Go Offline'}
                color='#FF5733'
            />);
        } else {
            cnxnButton = (<Button
                style={styles.navButton}
                onPress={() => this.goOnline()}
                title={'Go Online'}
                color='#33CEFF'
            />);
        }

		return (
			<View>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={styles.navButtonContainer}>
                        <Button
                            style={styles.navButton}
                            onPress={() => this.props.navigation.navigate('CreateCredentials')}
                            title={'Create Credentials'}
                            color='#33cc33'
                        />
                    </View>
                    <View style={styles.navButtonContainer}>
                        { cnxnButton }
                    </View>
                </View>

				<SectionList
					sections={this._parseData()}
					renderItem={({ item, index, section }) => (
						<Button
							key={index}
							title={item}
							onPress={((this.currentName = item), this.gotoPage.bind(this))}
						/>
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
