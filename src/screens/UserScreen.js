import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebase';

class UserScreen extends Component {
  static navigationOptions = {
    title: 'Daftar Warga'
  };

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('warga').orderBy('jaga', 'asc').where('jaga','>',0);
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { nama, jaga } = res.data();
      userArr.push({
        key: res.id,
        res,
        jaga,
        nama,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
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
      <View style={styles.button}>
        <Button
          buttonStyle={{}}
          title='Tambah Warga'
          onPress={() => this.props.navigation.navigate('AddUser')}
          color="#19AC52"
        >
        Tambah Warga
        </Button>
      </View>
          {
            this.state.userArr.map((item, i) => {
            let judul = i+1+'. '+item.nama;
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={judul}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetail', {
                      userkey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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
    marginVertical: 10,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginHorizontal: 10
  }
})

export default UserScreen;
