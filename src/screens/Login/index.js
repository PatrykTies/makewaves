import Amplify, {Auth, API} from 'aws-amplify';
import React, {useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
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
import useLoginContent from './query';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Keep on typing your email.').required('Required'),
  password: Yup.string()
    .min(2, 'Keep on typing. Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

const {width, height: wHeight} = Dimensions.get('window');

const Login = ({navigation}) => {
  const password = useRef(null);
  const inputChangeHandler = () => {};
  const submitHandler = () => {
    navigation.navigate('AdminScreens');
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: LoginSchema,
    onSubmit: v => submitHandler(v),
  });

  const {status, data, error, isFetching} = useLoginContent();

  if (status === 'loading' || status === 'error') {
    console.log('Error', error);
    return null;
  }

  const {text} = data.titlePrimary;

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
              {text} <Text variant="h1_deco">make waves</Text>
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
                onSubmitEditing={() => password.current?.focus()}
              />
              <TextField
                ref={password}
                icon="key"
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                autoCompleteType="password"
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

export default Login;
