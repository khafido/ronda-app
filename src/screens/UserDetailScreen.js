import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class UserDetailScreen extends Component {
  static navigationOptions = {
    title: 'Detail Warga'
  };

  constructor() {
    super();
    this.state = {
      nama: '',
      jaga: 0,
      key: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const dbRef = firebase.firestore().collection('warga').doc(this.props.navigation.getParam('userkey'))
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: this.props.navigation.getParam('userkey'),
          nama: user.nama,
          jaga: user.jaga,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('warga').doc(this.state.key);
    updateDBRef.set({
      nama: this.state.nama,
      jaga: parseInt(this.state.jaga),
    }).then((docRef) => {
      this.setState({
        key: '',
        nama: '',
        jaga: 0,
        isLoading: false,
      });
      this.props.navigation.navigate('User');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const dbRef = firebase.firestore().collection('warga').doc(this.props.navigation.getParam('userkey'))
    dbRef.delete().then((res) => {
        console.log('Item removed from database')
        this.props.navigation.navigate('User');
    })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Hapus Warga',
      'Anda Yakin?',
      [
        {text: 'Ya', onPress: () => this.deleteUser()},
        {text: 'Tidak', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      {
        cancelable: true
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              style={{ fontSize:20 }}
              placeholder={'Nama'}
              value={this.state.nama}
              onChangeText={(val) => this.inputValueUpdate(val, 'nama')}
          />
        </View>
        {/*}<View style={styles.inputGroup}>
          <TextInput
              style={{ fontSize:20 }}
              placeholder={'Jaga'}
              value={this.state.jaga}
              keyboardType="numeric"
              onChangeText={(val) => this.inputValueUpdate(val, 'jaga')}
          />
        </View>*/}
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#C5130A"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7,
  }
})

export default UserDetailScreen;
