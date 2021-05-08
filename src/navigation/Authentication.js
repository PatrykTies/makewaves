import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import PasswordReset from '../screens/PasswordReset';
import ConfirmPassword from '../screens/ConfirmPassword';
import AdminCalendar from '../screens/AdminCalendar';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name={'Login'} component={Login} />
      <AuthenticationStack.Screen
        name={'PasswordReset'}
        component={PasswordReset}
      />
      <AuthenticationStack.Screen
        name={'ConfirmPassword'}
        component={ConfirmPassword}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
