/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import * as firebase from 'firebase';
import { createAppContainer } from 'react-navigation';

import Navigation from './src/components/navigation';

const firebaseConfig = {
  apiKey: 'AIzaSyAuGfe4-H4PJ0SvcE14BrkEEZNlyslsLwk',
  authDomain: 'travel-app-bf7bb.firebaseapp.com',
  databaseURL: 'https://travel-app-bf7bb.firebaseio.com',
  projectId: 'travel-app-bf7bb',
  storageBucket: '',
  messagingSenderId: '102573166147',
  appId: '1:102573166147:web:2c60cb4befb3950fdf4ef6',
};
firebase.initializeApp(firebaseConfig);

export default createAppContainer(Navigation);
