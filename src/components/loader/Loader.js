import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import { styles } from './style';

const Loader = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'ArticleList' : 'Login');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loader;
