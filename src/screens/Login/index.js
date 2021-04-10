import Amplify, {Auth, API} from 'aws-amplify';
import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/atoms/Button';
import LinkButton from '../../components/atoms/LinkButton';
import TextField from '../../components/atoms/TextField';
import {Text, Box, Card} from '../../theme';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const {width} = Dimensions.get('window');
const Login = ({navigation}) => {
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
        <Box style={styles.screenContainer}>
          <Text variant="h1" paddingBottom="xl">
            Keep calm and <Text variant="h1_deco">make waves</Text>
          </Text>
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
                justifyContent="center"
                alignItems="center"
                width={width - 24}
                paddingBottom="md"
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
                <Box
                  flexDirection="row"
                  alignItems="center"
                  width="100%"
                  paddingTop="xl"
                  paddingBottom="lg">
                  <Box flex={1} />
                  <Box flex={1}>
                    <Button
                      variant="primary"
                      label="LOGIN"
                      onPress={handleSubmit}
                    />
                  </Box>
                  <Box flex={1} alignItems="center">
                    <LinkButton
                      variant="primary"
                      label="FORGOT?"
                      onPress={() => navigation.navigate('PasswordReset')}
                    />
                  </Box>
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
    alignItems: 'center',
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
