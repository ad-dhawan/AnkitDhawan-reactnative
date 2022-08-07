import React from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import CacheImage from '../components/CacheImage';
import {BACKGROUND, DARK_TEXT} from '../utils/colors';

const {width, height} = Dimensions.get('screen');
const IMAGE_HEIGHT = height / 2;

const Details = ({route}) => {
  const data = route.params.item;

  return (
    <>
      <CacheImage uri={data.avatar} style={styles.image} />

      <View style={styles.dataContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>

        <Text style={styles.description}>{data.description}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: '100%',
  },
  image: {
    width,
    height: IMAGE_HEIGHT,
  },
  dataContainer: {
    backgroundColor: BACKGROUND,
    padding: 15,
    position: 'absolute',
    top: IMAGE_HEIGHT - 30,
    borderRadius: 20,
    width,
    height,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    color: DARK_TEXT,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: DARK_TEXT,
  },
  description: {
    fontSize: 14,
    color: DARK_TEXT,
    marginTop: 12,
  },
});

export default Details;
