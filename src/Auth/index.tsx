import { View, Text } from 'react-native';
import React from 'react';
import { typographyStyles } from 'styles/typography';
import { useStyles } from 'react-native-unistyles';
import Container from 'components/Container';

const AuthNavigator = () => {
  const { theme } = useStyles();

  return (
    <Container>
      <View>
        <Text style={typographyStyles(theme).heading_1}>AuthNavigator</Text>
      </View>
    </Container>
  );
};

export default AuthNavigator;
