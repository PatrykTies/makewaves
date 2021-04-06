import React from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Card, Box, Text} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextField = ({icon, label, error, touched, ...props}) => {
  const {spacing, colors, fontSize} = useTheme();
  return (
    <>
      <Text
        variant="body"
        style={{alignSelf: 'flex-start', paddingTop: spacing.lg}}>
        {label}
      </Text>
      <Card
        variant="shadow_s"
        flexDirection="row"
        alignItems="center"
        width="100%"
        height={48}
        backgroundColor="primaryBckgr">
        <Box padding="md">
          <Icon name={icon} size={16} color={colors.primary} />
        </Box>
        <TextInput
          {...props}
          underlineColorAndroid="transparent"
          style={{width: '100%', height: '100%', fontSize: fontSize.lg}}
        />
      </Card>
      <Text variant="error" style={{alignSelf: 'flex-start'}}>
        error stuff
      </Text>
    </>
  );
};

export default TextField;
