import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { isEmpty } from 'lodash';

import {GetData} from '../services/axios';
import {ADD, BACKGROUND, DARK_TEXT, GREY, LIGHT_TEXT} from '../utils/colors';

const AddProduct = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    GetData.getCategories().then(res => {
      if (res && res.status === 200) {
        setCategories(res.data.categories);
      } else console.log(res);
    });
  }, []);

  const onPressAdd = () => {
      if(isEmpty(title) || isEmpty(price) || isEmpty(description) || isEmpty(image) || isEmpty(selectedCategory)){
        ToastAndroid.show('Error occurred, please try again later',ToastAndroid.SHORT, );
      } else{  
            try {
            setLoading(true);

            const data = {
                Name: title,
                Price: price,
                Description: description,
                Avatar: image,
                Category: selectedCategory.name,
                DeveloperEmail: 'ankit.ad.dhawan@gmail.com',
            };

            GetData.postProduct(formData).then(response => {
                if (response && response.status === 200) {
                console.log('RESPONSE: ', response.data);
                navigation.navigate('Feed');
                setLoading(false);
                } else {
                console.log(response);
                navigation.navigate('Feed');
                ToastAndroid.show(
                    'Error occurred, please try again later',
                    ToastAndroid.SHORT,
                );
                setLoading(false);
                }
            });
            } catch (e) {
            console.log(e);
            navigation.navigate('Feed');
            ToastAndroid.show(
                'Error occurred, please try again later',
                ToastAndroid.SHORT,
            );
            setLoading(false);
            }
        }
  };

  return (
    <>
      <Text style={styles.pageTitle}>Add Product</Text>

      <TextInput
        placeholder="product name"
        value={title}
        onChangeText={text => setTitle(text)}
        placeholderTextColor={GREY}
        style={styles.textInput}
      />

      <TextInput
        placeholder="product price"
        value={price}
        onChangeText={text => setPrice(text)}
        placeholderTextColor={GREY}
        style={styles.textInput}
      />

      <TextInput
        placeholder="product description"
        value={description}
        onChangeText={text => setDescription(text)}
        placeholderTextColor={GREY}
        style={[styles.textInput, {alignItems: 'flex-start'}]}
        numberOfLines={4}
      />

      <TextInput
        placeholder="product image URL"
        value={image}
        onChangeText={text => setImage(text)}
        placeholderTextColor={GREY}
        style={styles.textInput}
      />

      <FlatList
        data={categories}
        horizontal={true}
        contentContainerStyle={{marginLeft: 5}}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item)} activeOpacity={1} >
                <Text style={
                    [styles.categoryText, 
                    {
                        backgroundColor: selectedCategory === item ? ADD : BACKGROUND,
                        color: selectedCategory === item ? LIGHT_TEXT : DARK_TEXT,
                        borderColor: selectedCategory === item ? ADD : DARK_TEXT
                    }]
                    }>
                  {item.name}
                </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={onPressAdd}
        hitSlop={styles.hitSlop}
        activeOpacity={1}
        disabled={loading ? true : false}
        style={styles.addProductContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={LIGHT_TEXT} />
        ) : (
          <Text style={styles.addProductText}>Add Product</Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 18,
    color: DARK_TEXT,
    padding: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DARK_TEXT,
    margin: 10,
    paddingHorizontal: 5,
    backgroundColor: BACKGROUND,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    right: 10,
    left: 10,
  },
  addProductContainer: {
    backgroundColor: ADD,
    alignSelf: 'center',
    padding: 14,
    borderRadius: 10,
    bottom: 30
  },
  addProductText: {
    color: LIGHT_TEXT,
    fontSize: 13,
  },
  categoryContainer: {
      padding: 5,
      borderWidth: 1,
      borderColor: DARK_TEXT,
      borderRadius: 5,
      marginHorizontal: 5,
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
});

export default AddProduct;
