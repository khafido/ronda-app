import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebase';

class AddUserScreen extends Component {
  static navigationOptions = {
    title: 'Tambah Warga'
  };

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('warga');
    this.state = {
      userArr: [],
      nama: '',
      jaga: 0,
      isLoading: false
    };
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { nama, jaga } = res.data();
      userArr.push({
        key: res.id,
        // res,
        nama,
        jaga,
      });
    });
    this.setState({
      userArr
    });
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    console.log(this.state.userArr.length);
    console.log(this.state.userArr);
    if(this.state.nama === ''){
      alert('Fill at least your name!')
    // } else {
    //   this.setState({
    //     isLoading: true,
    //   });
    //   this.firestoreRef.add({
    //     nama: this.state.nama,
    //     jaga: parseInt(this.state.userArr.length),
    //   }).then((res) => {
    //     this.setState({
    //       nama: '',
    //       jaga: 0,
    //       isLoading: false,
    //     });
    //     this.props.navigation.navigate('Home')
    //   })
    //   .catch((err) => {
    //     console.error("Error found: ", err);
    //     this.setState({
    //       isLoading: false,
    //     });
    //   });
    }
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
      placeholder={'Name'}
      value={this.state.nama}
      onChangeText={(val) => this.inputValueUpdate(val, 'nama')}
      style={styles.inputText}
      />
      {/*<TextInput
      placeholder={'Jaga'}
      value={this.state.jaga}
      onChangeText={(val) => this.inputValueUpdate(val, 'jaga')}
      style={styles.inputText}
      keyboardType="numeric"
      />
      */}
      </View>
      <View style={styles.tombol}>
      <Button
      style={styles.tombol}
      title='Tambah Warga'
      onPress={() => this.storeUser()}
      color="#19AC52"
      >
      Add User
      </Button>
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
  },
  inputText:{
    fontSize: 20,
    marginTop: 20,
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
  tombol: {
    fontSize: 30
  }
})

export default AddUserScreen;
