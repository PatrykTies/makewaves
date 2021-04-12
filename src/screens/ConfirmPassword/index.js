import Amplify, {Auth, API} from 'aws-amplify';
import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import {
  StatusBar,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/atoms/Button';
import LinkButton from '../../components/atoms/LinkButton';
import TextField from '../../components/atoms/TextField';
import {Text, Box, Card} from '../../theme';

const ConfirmPassSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Keep on typing. Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  confirmPass: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const {width, height: wHeight} = Dimensions.get('window');

const ConfirmPassword = ({navigation}) => {
  const password = useRef(null);
  const confirmPass = useRef(null);
  const inputChangeHandler = () => {};
  const submitHandler = () => {
    navigation.navigate('Login');
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {code: '', password: '', confirmPass: ''},
    validationSchema: ConfirmPassSchema,
    onSubmit: v => submitHandler(v),
  });
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <SafeAreaView
        height={
          wHeight - (Platform.OS === 'android' ? StatusBar.currentHeight : 0)
        }>
        <ImageBackground
          source={require('../../assets/homepage_hero_375.jpg')}
          style={styles.bgimage}>
          <Image
            source={require('../../assets/makewaves.png')}
            style={styles.logo}
          />
          <Box style={styles.screenContainer}>
            <Text variant="h1" paddingBottom="xl">
              Create your <Text variant="h1_deco">new password</Text>
            </Text>
            <Text variant="h2" paddingBottom="xl">
              Enter verification code from your email box
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
                label="Verfication code"
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                error={errors.code}
                touched={touched.code}
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="Next"
                onSubmitEditing={() => password.current?.focus()}
              />
              <TextField
                ref={password}
                icon="key"
                label="New Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="Next"
                secureTextEntry
                onSubmitEditing={() => confirmPass.current?.focus()}
              />
              <TextField
                ref={confirmPass}
                icon="key"
                label="Confirm Password"
                onChangeText={handleChange('confirmPass')}
                onBlur={handleBlur('confirmPass')}
                error={errors.confirmPass}
                touched={touched.confirmPass}
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="Finish"
                secureTextEntry
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
                    onPress={() => navigation.navigate('PasswordReset')}
                  />
                </Box>
                <Box flex={1}>
                  <Button
                    variant="primary"
                    label="SUBMIT"
                    onPress={handleSubmit}
                  />
                </Box>
                <Box flex={1} />
              </Box>
            </Card>
          </Box>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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

export default ConfirmPassword;
