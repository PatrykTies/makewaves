import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import AdminCalendar from '../screens/AdminCalendar';

const AdminStack = createStackNavigator();

const AdminNavigator = props => {
  return (
    <AdminStack.Navigator headerMode="none">
      <AdminStack.Screen name={'AdminScreen'} component={AdminScreen} />
      <AdminStack.Screen name={'AdminCalendar'} component={AdminCalendar} />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
