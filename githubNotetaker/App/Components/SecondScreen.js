import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const styles = StyleSheet.create({
    navContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
});

class SecondScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Hi, I am the 2nd Screen/Scene/Page/View/Whatever</Text>
            </View>
        );
    }

}

module.exports = SecondScreen;