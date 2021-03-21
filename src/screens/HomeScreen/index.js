import Auth from '@aws-amplify/auth';
import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const ADD_USER = 'ADD_USER';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  // if (action.type === ADD_USER) {
  //   return {
  //     ...state,
  //     users: [...state.users, action.payload],
  //   };
  // }
};

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
    inputValidities: {
      username: false,
      email: false,
      password: false,
      role: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      console.log('FORM_INPUT_UPDATE');
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const submitHandler = () => {
    // if (!formState.formIsValid) {
    //   Alert.alert('Wrong input!', 'Please check the errors in the form.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    Keyboard.dismiss();
    // Alert.alert(formState.inputValues.email);
    console.log(formState);
    setUsers(state => [...state, formState.inputValues]);

    // Auth.addUser(
    //   prodId,
    // formState.inputValues.title,
    // formState.inputValues.description,
    // formState.inputValues.imageUrl,
    // )
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          email
          id="email"
          label="Email"
          errorText="Please enter a valid email!"
          keyboardType="default"
          autoCapitalize="none"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={''}
          initiallyValid
          required
        />
        <Input
          id="username"
          label="Username"
          errorText="Please enter a valid username!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={''}
          initiallyValid
          required
        />
        <Icon name="rocket" size={30} color="#900" />
        <Button title="Add user" onPress={submitHandler} />
        {users &&
          users.map((user, i) => {
            return (
              <View key={user.email + i}>
                <Text>{user.email}</Text>
                <Text>{user.username}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default HomeScreen;
