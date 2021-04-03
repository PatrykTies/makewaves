import Amplify, {Auth, API} from 'aws-amplify';
import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  Alert,
} from 'react';
import {
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
  Keyboard,
  ImageBackground,
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
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

  // HOW TO ADD ADMIN REST API with Amplify Auth, for add and retrieve users
  // https://aws.amazon.com/blogs/mobile/amplify-cli-enables-creating-amazon-cognito-user-pool-groups-configuring-fine-grained-permissions-on-groups-and-adding-user-management-capabilities-to-applications/
  useEffect(() => {
    let nextToken;
    const listUsers = async limit => {
      let apiName = 'AdminQueries';
      let path = '/listUsersInGroup';
      let myInit = {
        queryStringParameters: {
          groupname: 'wavemaker',
          limit: limit,
          token: nextToken,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      const {NextToken, ...rest} = await API.get(apiName, path, myInit);
      nextToken = NextToken;
      return rest;
    };

    const getUsers = async () => {
      const normal_users = await listUsers(10);
      console.log(normal_users.Users[0].Attributes[4].Value);
    };

    getUsers();

    //setUsers(normal_users);
  }, [setUsers]);

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

  const addUserToGroup = async groupName => {
    const apiName = 'AdminQueries';
    const path = '/addUserToGroup';
    const myInit = {
      body: {
        username: 'anetaties@gmail.com',
        groupname: groupName,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    return await API.post(apiName, path, myInit);
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  const submitHandler = async () => {
    Keyboard.dismiss();
    // if (!formState.formIsValid) {
    //   Alert.alert('Wrong input!', 'Please check the errors in the form.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }

    // https://github.com/aws-amplify/amplify-cli/issues/3951
    const signUp = async () => {
      const user = {
        username: 'anetaties@gmail.com',
        password: '01Misiek10',
        attributes: {
          email: 'anetaties@gmail.com',
          phone_number: '+4407891397145',
        },
      };
      try {
        await Auth.signUp(user);
        console.log('Aneta signed up!');
      } catch (e) {
        console.log(e);
      }
    };
    signUp();
    const res = await addUserToGroup('wavemaker');
    console.log(res);
    //setUsers(state => [...state, formState.inputValues]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/homepage_hero_375.jpg')}
        style={styles.image}>
        <Text style={styles.title}>Keep calm and make waves</Text>
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
          <Button title="Add user" onPress={submitHandler} />
          <Button title="Sign out" onPress={signOut} />
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
      </ImageBackground>
    </View>
  );
};

const getFontFamily = font => {
  return font;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'SFProDisplay-Ultralight',
    lineHeight: 38,
    fontSize: 28,
    alignSelf: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  form: {
    height: '40%',
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
