import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Home from './Screens/Home'

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2da9d4"/>
      <Home />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  buttonAddWrap : {
    position : 'absolute',
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    elevation : 4,
    bottom : 40,
    right : 20,
  },
  
  addButton : {
    height : 50,
    width : 50,
    elevation : 4,
  },

});

export default App;
