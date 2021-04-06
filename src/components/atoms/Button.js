import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useRestyle, spacing, border, backgroundColor} from '@shopify/restyle';

import {Text, Box} from '../../theme';

const restyleFunctions = [spacing, border, backgroundColor];

const Button = ({onPress, label, ...rest}) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        {...props}
        marginTop="xl"
        marginBottom="lg"
        borderWidth={1}
        borderColor="primary"
        backgroundColor="primary">
        <Text
          variant="cta"
          paddingHorizontal="lg"
          paddingVertical="sm"
          textAlign="center"
          color="textPrimaryInverse">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
