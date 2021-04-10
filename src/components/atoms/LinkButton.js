import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useRestyle, spacing, border, backgroundColor} from '@shopify/restyle';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Text, Box} from '../../theme';

const restyleFunctions = [spacing, border, backgroundColor];

const LinkButton = ({onPress, label, ...rest}) => {
  return (
    <BorderlessButton onPress={onPress} backgroundColor="white">
      <Text variant="cta" color="textDecorated">
        {label}
      </Text>
    </BorderlessButton>
  );
};

export default LinkButton;
