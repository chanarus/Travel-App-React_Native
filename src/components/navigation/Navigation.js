import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Article from '../article';
import ArticleList from '../articleList';
import Login from '../login';
import Register from '../register';
import Loader from '../loader';

export default createStackNavigator(
  {
    ArticleList,
    Article,
    Login,
    Register,
    Loader,
  },
  {
    initialRouteName: 'Loader',
  },
);
