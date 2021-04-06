import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import PasswordReset from '../screens/PasswordReset';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name={'Login'} component={Login} />
      <AuthenticationStack.Screen
        name={'PasswordReset'}
        component={PasswordReset}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
