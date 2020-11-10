import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    // borderRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // elevation: 3
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 8,
    width: '100%'
  },
  categoriesInfo: {
    flex: 1,
    // fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  titleCaption: {
    // borderColor: '#cccccc',
    // borderWidth: 1,
    // borderRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderWidth: 0.5,
    // borderColor: 'grey',
    alignItems:'center',
    width:'100%',
    height:'30%',
    backgroundColor: '#7EBC49',
  },
  daftarOrang: {
    // borderWidth: 0.5,
    // borderColor: 'grey',
    // borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width:'100%',
    height:'65%',
    padding:'5%',
    backgroundColor: '#868686'
    // backgroundColor: '#E2E3E3'
  },
  orang: {
    fontSize: 20,
    textTransform: 'uppercase',
    // fontWeight: 'bold',
    color: '#fff',
    padding: 3,
    paddingTop: 0
  }
});

export default styles;
