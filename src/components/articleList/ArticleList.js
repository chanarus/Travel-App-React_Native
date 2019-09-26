import React from 'react';
import {
  Animated,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import * as theme from '../../theme/theme';
import { mocks } from '../../mocks';

const { width } = Dimensions.get('window');

import { styles } from './style';

const ArticleList = props => {
  const scrollX = new Animated.Value(0);

  const renderDots = () => {
    const { destinations } = props;
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View
        style={[
          styles.flex,
          styles.row,
          { justifyContent: 'center', alignItems: 'center', marginTop: 10 },
        ]}>
        {destinations.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[
                styles.dots,
                styles.activeDot,
                { borderWidth: borderWidth },
              ]}
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
        />
      );
    });
  };

  const renderDestinations = () => {
    return (
      <View style={[styles.column, styles.destinations]}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{ overflow: 'visible', height: 280 }}
          data={props.destinations}
          keyExtractor={(item, index) => `${item.id}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
          renderItem={({ item }) => renderDestination(item)}
        />
        {renderDots()}
      </View>
    );
  };

  const renderDestination = item => {
    const { navigation } = props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Article', { article: item })}>
        <ImageBackground
          style={[styles.flex, styles.destination, styles.shadow]}
          imageStyle={{ borderRadius: theme.sizes.radius }}
          source={{ uri: item.preview }}>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={{ flex: 0 }}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            </View>
            <View
              style={[
                styles.column,
                { flex: 2, paddingHorizontal: theme.sizes.padding / 2 },
              ]}>
              <Text style={{ color: theme.colors.white, fontWeight: 'bold' }}>
                {item.user.name}
              </Text>
              <Text style={{ color: theme.colors.white }}>
                <Octicons
                  name="location"
                  size={theme.sizes.font * 0.8}
                  color={theme.colors.white}
                />
                <Text> {item.location}</Text>
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
          <Text
            style={{
              fontSize: theme.sizes.font * 1.25,
              fontWeight: '500',
              paddingBottom: 8,
            }}>
            {item.title}
          </Text>
          <View
            style={[
              styles.row,
              { justifyContent: 'space-between', alignItems: 'flex-end' },
            ]}>
            <Text style={{ color: theme.colors.caption }}>
              {item.description.split('').slice(0, 50)}...
            </Text>
            <FontAwesome
              name="chevron-right"
              size={theme.sizes.font * 0.75}
              color={theme.colors.caption}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecommended = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommended]}>
        <View style={[styles.row, styles.recommendedHeader]}>
          <Text style={{ fontSize: theme.sizes.font * 1.4 }}>Recommended</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: theme.colors.caption }}>More</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, styles.recommendedList]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[styles.shadow, { overflow: 'visible' }]}
            data={props.destinations}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({ item, index }) => renderRecommendation(item, index)}
          />
        </View>
      </View>
    );
  };

  const renderRecommendation = (item, index) => {
    const { destinations } = props;
    const isLastItem = index === destinations.length - 1;
    return (
      <View
        style={[
          styles.flex,
          styles.column,
          styles.recommendation,
          styles.shadow,
          index === 0 ? { marginLeft: theme.sizes.margin } : null,
          isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
        ]}>
        <View style={[styles.flex, styles.recommendationHeader]}>
          <Image
            style={[styles.recommendationImage]}
            source={{ uri: item.preview }}
          />
          <View style={[styles.flex, styles.row, styles.recommendationOptions]}>
            <Text style={styles.recommendationTemp}>{item.temperature}℃</Text>
            <FontAwesome
              name={item.saved ? 'bookmark' : 'bookmark-o'}
              color={theme.colors.white}
              size={theme.sizes.font * 1.25}
            />
          </View>
        </View>
        <View
          style={[
            styles.flex,
            styles.column,
            styles.shadow,
            {
              justifyContent: 'space-evenly',
              padding: theme.sizes.padding / 2,
            },
          ]}>
          <Text
            style={{
              fontSize: theme.sizes.font * 1.25,
              fontWeight: '500',
              paddingBottom: theme.sizes.padding / 4.5,
            }}>
            {item.title}
          </Text>
          <Text style={{ color: theme.colors.caption }}>{item.location}</Text>
          <View
            style={[
              styles.row,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: theme.sizes.margin,
              },
            ]}>
            {renderRatings(item.rating)}
            <Text style={{ color: theme.colors.active }}>{item.rating}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: theme.sizes.padding }}>
      {renderDestinations()}
      {renderRecommended()}
    </ScrollView>
  );
};

ArticleList.navigationOptions = {
  header: (
    <View style={[styles.flex, styles.row, styles.header]}>
      <View>
        <Text style={{ color: theme.colors.caption }}>Search for place</Text>
        <Text style={{ fontSize: theme.sizes.font * 2 }}>Destination</Text>
      </View>
      <View>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
        />
      </View>
    </View>
  ),
};

ArticleList.defaultProps = {
  destinations: mocks,
};

export default ArticleList;