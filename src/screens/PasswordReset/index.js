import Amplify, {Auth, API} from 'aws-amplify';
import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/atoms/Button';
import TextField from '../../components/atoms/TextField';
import {Text, Box, Card} from '../../theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const Login = () => {
  const inputChangeHandler = () => {};
  const submitHandler = () => {};
  return (
    <SafeAreaView flex={1}>
      <ImageBackground
        source={require('../../assets/homepage_hero_375.jpg')}
        style={styles.bgimage}>
        <Image
          source={require('../../assets/makewaves.png')}
          style={styles.logo}
        />
        <Box
          alignItems="center"
          position="absolute"
          width="100%"
          paddingTop="xl"
          backgroundColor="none"
          style={styles.title}>
          <Text variant="h1">
            Keep calm and <Text variant="h1_deco">make waves</Text>
          </Text>
        </Box>
        <Box style={styles.screenContainer}>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={values => submitHandler(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <Card
                variant="shadow_md"
                alignItems="center"
                justifyContent="center"
                marginHorizontal="lg"
                paddingHorizontal="xl"
                paddingVertical="md"
                backgroundColor="primaryBckgr">
                <TextField
                  icon="envelope"
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                />
                <TextField
                  icon="key"
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                />
                <Box flexDirection="row" alignSelf="flex-end">
                  <Button
                    variant="primary"
                    label="LOGIN"
                    onPress={handleSubmit}
                  />
                  <Button
                    variant="primaryInverse"
                    label="RESET"
                    onPress={() => {}}
                  />
                </Box>
              </Card>
            )}
          </Formik>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    top: '10%',
  },
  bgimage: {
    flex: 1,
    resizeMode: 'cover',
  },
  logo: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 24,
    left: 24,
    resizeMode: 'contain',
  },
});

export default Login;
