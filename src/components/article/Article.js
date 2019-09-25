import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import * as theme from '../../theme/theme';

const { width } = Dimensions.get('window');

import { styles } from './style';

const Article = props => {
  const scrollX = new Animated.Value(0);

  const { navigation } = props;
  const article = navigation.getParam('article');

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={[styles.flex, styles.row, styles.dotsContainer]}>
        {article.images.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`step-${item}-${index}`}
              style={[styles.dots, { opacity }]}
            />
          );
        })}
      </View>
    );
  };

  const renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={theme.sizes.font}
          color={theme.colors[activeStar ? 'active' : 'gray']}
          style={{ marginRight: 4 }}
        />
      );
    });
  };

  return (
    <View style={styles.flex}>
      <View style={[styles.flex]}>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}>
          {article.images.map((img, index) => (
            <Image
              key={`${index}-${img}`}
              source={{ uri: img }}
              resizeMode="cover"
              style={{ width, height: width }}
            />
          ))}
        </ScrollView>
        {renderDots()}
      </View>
      <View style={[styles.flex, styles.content]}>
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={{ uri: article.user.avatar }}
          />
          <Text style={styles.title}>{article.title}</Text>
          <View
            style={[
              styles.row,
              { alignItems: 'center', marginVertical: theme.sizes.margin / 2 },
            ]}>
            {renderRatings(article.rating)}
            <Text style={{ color: theme.colors.active }}>{article.rating}</Text>
            <Text style={{ marginLeft: 8, color: theme.colors.caption }}>
              ({article.reviews} reviews)
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.description}>
              {article.description.split('').slice(0, 180)}...
              <Text style={{ color: theme.colors.active }}> Read more</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

Article.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <View style={[styles.flex, styles.row, styles.header]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <FontAwesome
            name="chevron-left"
            color={theme.colors.white}
            size={theme.sizes.font}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="more-horiz"
            color={theme.colors.white}
            size={theme.sizes.font * 1.5}
          />
        </TouchableOpacity>
      </View>
    ),
    headerTransparent: true,
  };
};

export default Article;
