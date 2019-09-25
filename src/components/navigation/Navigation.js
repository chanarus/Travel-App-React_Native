import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Article from '../article';
import ArticleList from '../articleList';

export default createStackNavigator(
  {
    ArticleList,
    Article,
  },
  {
    initialRouteName: 'ArticleList',
  },
);
