import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Products from '../screens/Products';
import Details from '../screens/Details';
import AddProduct from '../screens/AddProduct';

const Stack = createStackNavigator();

enableScreens();

const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>

            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
        
      </Stack.Navigator>
    </>
  );

};

export default StackNavigator;
