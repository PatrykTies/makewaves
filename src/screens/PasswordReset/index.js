import Amplify, {Auth, API} from 'aws-amplify';
import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
  StyleSheet,
  Keyboard,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/atoms/Button';
import TextField from '../../components/atoms/TextField';
import LinkButton from '../../components/atoms/LinkButton';
import {Text, Box, Card} from '../../theme';

const PassResetSchema = Yup.object().shape({
  email: Yup.string().email('Keep on typing your email.').required('Required'),
});

const {width, height: wHeight} = Dimensions.get('window');

const PasswordReset = ({navigation}) => {
  const inputChangeHandler = () => {};
  const submitHandler = () => {
    navigation.navigate('ConfirmPassword');
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {email: ''},
    validationSchema: PassResetSchema,
    onSubmit: v => submitHandler(v),
  });
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
            Request password <Text variant="h1_deco">reset</Text>
          </Text>
          <Text
            variant="h2"
            paddingBottom="xl"
            paddingHorizontal="xl"
            textAlign="center">
            After few minutes check your email box for reset code
          </Text>
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
              autoCompleteType="email"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="Next"
              onSubmitEditing={() => handleSubmit()}
            />
            <Box
              flexDirection="row"
              alignItems="center"
              width="100%"
              paddingTop="xl"
              paddingBottom="lg">
              <Box flex={1} alignItems="center">
                <LinkButton
                  variant="primary"
                  label="BACK"
                  onPress={() => navigation.navigate('Login')}
                />
              </Box>
              <Box flex={1}>
                <Button variant="primary" label="SEND" onPress={handleSubmit} />
              </Box>
              <Box flex={1} />
            </Box>
          </Card>
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

export default PasswordReset;
