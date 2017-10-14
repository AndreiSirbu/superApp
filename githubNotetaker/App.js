import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS, AppRegistry } from 'react-native';
import Main from './App/Components/Main';

const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
});


export default class App extends React.Component {
  render() {
    return (
        <NavigatorIOS
            style={styles.navContainer}
            initialRoute={{
                component: Main,
                title: 'GitHub Notetaker',
                backButtonTitle: 'Back'
            }}
        />
    );
  }
}

AppRegistry.registerComponent('StarterNavigatorIOS', () => StarterNavigatorIOS);
