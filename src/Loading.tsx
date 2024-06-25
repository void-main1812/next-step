import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

const Loading = ({ navigation }: any) => {
  // useEffect(() => {
  //   const navigateToHome = setTimeout(() => {
  //     navigation.replace('Auth');
  //   }, 2000);
  //   return () => clearTimeout(navigateToHome);
  // });

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;
