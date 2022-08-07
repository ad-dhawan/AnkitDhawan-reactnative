import React, {useEffect, useState} from 'react';
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {GetData} from '../services/axios';
import ProductItem from '../components/ProductItem'
import { ADD, DARK_TEXT, LIGHT_TEXT, BACKGROUND } from '../utils/colors';

const ADD_BUTTON_SIZE = 50

const Products = ({navigation}) => {
    const {feed} = useSelector(state => state);
    const dispatch = useDispatch();

    const [data, setData] = useState(feed);
    const [categoryData, setCategoryData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
          GetData.getProducts().then(res => {
              if (res && res.status === 200) {
                  setData(res.data.products);
                  setFilteredData(res.data.products);

                  dispatch({
                    type: 'FEED',
                    payload: res.data.products,
                  });
              } else console.log(res);
          });
          hashTags();
      }, [])

      useEffect(() => {
          if(selectedCategory === 'all') setFilteredData(data)
          else{
              setFilteredData(
                data
                .filter(item => item.category === Object.keys(selectedCategory).toString())
                .map(item => item),
              )
          }
      }, [selectedCategory])

      function hashTags() {
        let tags = [];
        data.map(item => {
          tags.push(item.category)
        });
    
        let rObj = {};
        let finalArray = [];
        tags.map(function (currentValue, index) {
          if (rObj.hasOwnProperty(currentValue)) {
            rObj[currentValue] = rObj[currentValue] + 1;
          } else {
            rObj[currentValue] = 1;
          }
        });
        for (let keys in rObj) {
          let obj = {};
          obj[keys] = rObj[keys];
          finalArray.push(obj);
        }
        console.log("HASHTAG ARRAY", finalArray)
        setCategoryData(finalArray);
      }

    return(
        <>
            <Text style={styles.pageTitle}>UPayments Store</Text>

            <FlatList
                data={categoryData}
                horizontal={true}
                contentContainerStyle={{marginLeft: 5}}
                ListHeaderComponent={() => (
                    <TouchableOpacity onPress={() => setSelectedCategory('all')} activeOpacity={1} >
                            <Text style={
                                [styles.categoryText, 
                                {
                                    backgroundColor: selectedCategory === 'all' ? ADD : BACKGROUND,
                                    color: selectedCategory === 'all' ? LIGHT_TEXT : DARK_TEXT,
                                    borderColor: selectedCategory === 'all' ? ADD : DARK_TEXT
                                }]
                                }>
                            all ({data.length})
                            </Text>
                    </TouchableOpacity>
                )}
                renderItem={({item, index}) => {
                    return(
                        <TouchableOpacity onPress={() => setSelectedCategory(item)} activeOpacity={1} >
                            <Text style={
                                [styles.categoryText, 
                                {
                                    backgroundColor: selectedCategory === item ? ADD : BACKGROUND,
                                    color: selectedCategory === item ? LIGHT_TEXT : DARK_TEXT,
                                    borderColor: selectedCategory === item ? ADD : DARK_TEXT
                                }]
                                }>
                            {Object.keys(item)} ({Object.values(item)})
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <FlatList
                data={filteredData}
                numColumns={2}
                contentContainerStyle={{paddingBottom: 50}}
                columnWrapperStyle={{justifyContent: 'space-evenly'}}
                renderItem={({item, index}) => (
                    <ProductItem item={item} index={index} navigation={navigation} />
                )}
            />

            <TouchableOpacity onPress={() => navigation.navigate('AddProduct')} activeOpacity={1} style={styles.addButtonContainer}  >
                <Text style={styles.addButton} >+</Text>
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 18,
        color: DARK_TEXT,
        fontWeight: 'bold',
        margin: 10,
        fontStyle: 'italic'
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: ADD,
        borderRadius: ADD_BUTTON_SIZE,
        width: ADD_BUTTON_SIZE,
        height: ADD_BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        fontSize: 28,
        color: LIGHT_TEXT
    },
    categoryText: {
        fontSize: 13,
        textTransform: 'lowercase',
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        padding: 5,
        marginTop: 10
    }
})

export default Products;