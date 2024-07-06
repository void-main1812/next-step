import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Container from 'components/Container';
import { typographyStyles } from 'styles/typography';
import { Image } from 'expo-image';

const RapidApi = () => {
  const { styles, theme } = useStyles(styleSheet);

  return (
    <SafeAreaView>
      <Container statusBarColor="transparent">
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/socialIcons/RapidApi.png')}
              style={styles.image}
            />
          </View>
          <Text style={typographyStyles(theme).heading_3}>Powered by</Text>
          <Text style={typographyStyles(theme).title}>Rapid Api</Text>
        </View>
      </Container>
    </SafeAreaView>
  );
};

export default RapidApi;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 16
  },

  imageContainer: {
    elevation: 35,
    backgroundColor: theme.components.Background.color,
    width: 100,
    height: 100,
    borderRadius: 16
  },
}));
