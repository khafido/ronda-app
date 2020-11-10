import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import firebase from '../../../database/firebase';
import moment from 'moment';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Jadwal Ronda'
  };

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('warga').orderBy('jaga', 'asc');
    this.state = {
      userArr: [],
      indexWarga: -1,
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

  onPressCategory = item => {
    const title = item.nama;
    const category = item;
    this.props.navigation.navigate('RecipesList', { category, title });
  }

  getWarga = item => {
    // console.log(item);
  }

  getIndex = flag => {
    if (flag>this.state.userArr.length-1) {
      return 1;
    }
    return flag;
  }

  renderCategory = ({ item, index }) => {
    console.log(item);
    // const daftar = item.unshift(0);
    let warga = [];
    let urutan = 0;
    if (item.length>0) {
      for (var i = 0; i < 14; i++) {
        warga.push(
          <TouchableHighlight style={{  }} underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.getWarga(item)}>
          <View style={ styles.categoriesItemContainer }>
          <View style={ styles.titleCaption }>
          <Text style={ styles.categoriesName }>
          {
            moment()
            .utcOffset('+07:00').add(i, 'days')
            .format('dddd')
          }
          </Text>
          <Text style={ styles.categoriesInfo }>
          {
            moment()
            .utcOffset('+07:00').add(i, 'days')
            .format('Do MMMM')
          }
          </Text>
          </View>
            <View style={ styles.daftarOrang }>
            <Text style={{display:'none'}}>{urutan>this.state.userArr.length-1?urutan=1:null}</Text>
            <Text style={ styles.orang }>1. {item[this.getIndex(++urutan)].nama }</Text>
            <Text style={{display:'none'}}>{urutan>this.state.userArr.length-1?urutan=1:null}</Text>
            <Text style={ styles.orang }>2. {item[this.getIndex(++urutan)].nama }</Text>
            <Text style={{display:'none'}}>{urutan>this.state.userArr.length-1?urutan=1:null}</Text>
            <Text style={ styles.orang }>3. {item[this.getIndex(++urutan)].nama }</Text>
            <Text style={{display:'none'}}>{urutan>this.state.userArr.length-1?urutan=1:null}</Text>
            <Text style={ styles.orang }>4. {item[this.getIndex(++urutan)].nama }</Text>
            </View>
          </View>
          </TouchableHighlight>
        )
        if (urutan>this.state.userArr.length-1) {
          urutan = 1;
        }
      }
    }
    return (warga)
  }

  render() {
    const data = [{},this.state.userArr];
    return (
      <View>
      <FlatList
      data={data}
      renderItem={this.renderCategory}
      keyExtractor={item => `${item.key}`}
      />
      </View>
    );
  }
}
