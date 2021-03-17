import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <View>
      <Icon name="rocket" size={30} color="#900" />
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;
