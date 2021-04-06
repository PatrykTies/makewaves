import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const AdminNStack = createStackNavigator();

const AdminNavigator = props => {
  return (
    <AdminNStack.Navigator headerMode="none">
      <AdminNStack.Screen name={'AdminHome'} component={HomeScreen} />
    </AdminNStack.Navigator>
  );
};

export default AdminNavigator;
