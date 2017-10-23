import React from 'react';
import {AlertIOS, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import PouchDB from 'pouchdb-react-native';
import {Row, Rows, Table} from 'react-native-table-component';

const db = new PouchDB('mydb');
let db_data;

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
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {marginLeft: 5},
    row: {height: 30},
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
});

class ThirdScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textToBeChanged: 'this should change',
            tableHead: ['Id', 'title'],
            dbId: '',
            dbTitle: '',
            tableData: []
        };
    }

    setInitialData = () => {
        console.log("mda2");
        let mainObj = this;
        let initialTableData = [];
        db.allDocs({
            include_docs: true,
            attachments: true
        }, function (err, response) {
            if (err) {
                return console.log(err);
            }
            db_data = response;
            Object.keys(db_data.rows).map(function (keyName, keyIndex) {
                initialTableData.push([db_data.rows[keyIndex]['id'], db_data.rows[keyIndex]['doc']['title']]);
            });
        });
        this.setState({tableData: initialTableData});
    };

    addData = () => {
        db.bulkDocs([
            {title: 'Lisa Says', _id: 'doc1'},
            {title: 'Space Oddity', _id: 'doc2'},
            {title: 'Space Oddity2', _id: 'doc3'}
        ]).then(function (result) {
            // handle result
        }).catch(function (err) {
            console.log(err);
        });
        AlertIOS.alert(
            'Data Added',
            'All your data are belong to us.'
        );
    };

    showData = () => {
        let newText = "";
        let newTableData = [];
        Object.keys(db_data.rows).map(function (keyName, keyIndex) {
            newTableData.push([db_data.rows[keyIndex]['id'], db_data.rows[keyIndex]['doc']['title']]);
        });
        this.setState({textToBeChanged: newText});
        this.setState({tableData: this.state.tableData.concat(newTableData)});
    };

    handleId = (text) => {
        this.setState({dbId: text});
    };

    handleTitile = (text) => {
        this.setState({dbTitle: text});
    };

    addDataToTable = () => {
        let newId = this.state.dbId;
        let newTitle = this.state.dbTitle;
        let newTableData = [[newId, newTitle]];
        let mainObj = this;
        if (newId == "" || newTitle == "") {
            AlertIOS.alert(
                'Invalid Data',
                'No blank fields please!'
            );
        } else {
            db.put({
                _id: newId,
                title: newTitle
            }, function (err, response) {
                if (err) {
                    AlertIOS.alert(
                        'Error',
                        'Could not add data to db!'
                    );
                    return console.log(err);
                }
                mainObj.setState({tableData: mainObj.state.tableData.concat(newTableData)});
            });
        }
    };

    componentWillMount() {
        let mainObj = this;
        let initialTableData = [];
        db.allDocs({
            include_docs: true,
            attachments: true
        }, function (err, response) {
            if (err) {
                return console.log(err);
            }
            db_data = response;
            Object.keys(db_data.rows).map(function (keyName, keyIndex) {
                initialTableData.push([db_data.rows[keyIndex]['id'], db_data.rows[keyIndex]['doc']['title']]);
            });
            mainObj.setState({tableData: initialTableData});
        });

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Hi, I am the 3rd Screen/Scene/Page/View/Whatever</Text>
                    <TouchableHighlight
                        style={styles.myButton}
                        onPress={(this.addData)}
                    >
                        <Text>Add Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.myButton}
                        onPress={(this.showData)}
                    >
                        <Text>Show Data</Text>
                    </TouchableHighlight>
                    <Table>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text}/>
                    </Table>
                    <TextInput style={styles.input}
                               placeholder="Id"
                               placeholderTextColor="#9a73ef"
                               autoCapitalize="none"
                               onChangeText={this.handleId}/>

                    <TextInput style={styles.input}
                               underlineColorAndroid="transparent"
                               placeholder="Title"
                               placeholderTextColor="#9a73ef"
                               autoCapitalize="none"
                               onChangeText={this.handleTitile}/>
                    <TouchableHighlight
                        style={styles.myButton}
                        onPress={(this.addDataToTable)}
                    >
                        <Text>Add Data</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

}

module.exports = ThirdScreen;