import React, {forwardRef} from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Card, Box, Text} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextField = forwardRef(({icon, label, error, touched, ...props}, ref) => {
  const {colors, fontSize} = useTheme();
  return (
    <Box
      width="100%"
      paddingHorizontal="lg"
      paddingTop="lg"
      position="relative">
      <Text variant="body">{label}</Text>
      <Card
        variant="shadow_s"
        flexDirection="row"
        height={48}
        backgroundColor="primaryBckgr">
        <Box padding="md">
          <Icon name={icon} size={16} color={colors.primary} />
        </Box>
        <TextInput
          {...props}
          {...{ref}}
          underlineColorAndroid="transparent"
          style={{
            flex: 1,
            fontSize: fontSize.lg,
          }}
        />
        {error && touched && <Text variant="inputError">{error}</Text>}
      </Card>
    </Box>
  );
});

export default TextField;
