import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import CacheImage from './CacheImage'
import { DARK_TEXT, LIGHT_TEXT, TRANSPARENT } from '../utils/colors';

const {width, height} = Dimensions.get('screen')
const IMAGE_WIDTH = (width / 2) - 15
const IMAGE_HEIGHT = height / 3.5
const ITEM_RADIUS = 8

const ProductItem = ({item, index, navigation}) => {
    return(
        <>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {item: item})} activeOpacity={1} style={styles.mainContainer} >
                <CacheImage uri={item.avatar} style={styles.image} />

                <LinearGradient
                    colors={[TRANSPARENT, '#00000050', DARK_TEXT]}
                    style={styles.linearGradient}
                />

                <View style={styles.detailsContainer} >
                    <Text style={styles.name} >{item.name}</Text>
                    <Text style={styles.price} >${item.price}</Text>
                </View>

            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: ITEM_RADIUS,
        marginVertical: 8
    },
    image: {
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        borderRadius: ITEM_RADIUS
    },
    linearGradient: {
        position: 'absolute',
        bottom: 0,
        height: '50%',
        width: '100%'
    },
    detailsContainer: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        left: 4,
        padding: 4
    },
    name: {
        fontSize: 10,
        color: LIGHT_TEXT,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 10,
        color: LIGHT_TEXT,
        marginTop: 4
    }
})

export default ProductItem;