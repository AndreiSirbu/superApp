import React from 'react';
import {Button, StyleSheet, Text, TouchableHighlight, Vibration, View, AlertIOS, FlatList} from 'react-native';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';

const styles = StyleSheet.create({
    navContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch',
    },
    myButton: {
        backgroundColor: '#68a0cf',
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.showSecondScreen = this.showSecondScreen.bind(this);
        this.showThirdScreen = this.showThirdScreen.bind(this);
        //this.vibrateOnTouch = this.vibrateOnTouch.bind();
    }

    showSecondScreen(entry) {
        this.props.navigator.push({
            title: '2nd Screen',
            component: SecondScreen,
            passProps: {
                entry: entry
            }
        });
    }

    showThirdScreen(entry) {
        this.props.navigator.push({
            title: '3rd Screen',
            component: ThirdScreen,
            passProps: {
                entry: entry
            }
        });
    }

    vibrateOnTouch() {
        Vibration.vibrate([1000, 2000, 3000])
    }

    sendAlert() {
        AlertIOS.alert(
            'Sync Complete',
            'All your data are belong to us.'
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.myButton}
                    onPress={(this.showSecondScreen)}
                >
                    <Text>Second Screen</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.myButton}
                    onPress={(this.showThirdScreen)}
                >
                    <Text>Third Screen</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.myButton}
                    onPress={(this.vibrateOnTouch)}
                >
                    <Text>Vibrate</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.myButton}
                    onPress={(this.sendAlert)}
                >
                    <Text>Send Alert</Text>
                </TouchableHighlight>
                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }
}

module.exports = Main;