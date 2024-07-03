import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';

const styles = StyleSheet.create({
  trendingItem: {
    marginRight: 5,
  },
  thumbnail: {
    width: 200,
    height: 150,
    borderRadius: 33,
    overflow: 'hidden',
    marginBottom: 5,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  playButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
});

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={[styles.trendingItem, { transform: [{ scale: activeItem === item.$id ? 1.1 : 1 }] }]}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={styles.thumbnail}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={styles.thumbnail}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          >
            <Image
              source={icons.play}
              style={styles.playButton}
              resizeMode="contain"
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
