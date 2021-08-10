import Amplify, {Auth, API} from 'aws-amplify';
import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  Alert,
} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
  Keyboard,
  ImageBackground,
} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/atoms/Input';
import {Text, Box} from '../../theme';

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

const SelectScreen = ({navigation}) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  // render
  const renderItem = useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView flex={1}>
      <Box flex={1} overflow="hidden">
        <Box alignItems="center" paddingVertical="xl" backgroundColor="none">
          <Text variant="h1">
            Keep calm and <Text variant="h1_deco">make waves</Text>
          </Text>
        </Box>
        <Box
          alignItems="center"
          paddingVertical="xl"
          backgroundColor="primaryBckgr">
          <Button
            title="Calendar"
            onPress={() => navigation.navigate('AdminCalendar')}
          />
        </Box>
      </Box>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'grey',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 24,
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

export default SelectScreen;
