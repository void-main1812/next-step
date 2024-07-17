import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

const Home = ({navigation}: any) => {

  const {signOut, isSignedIn} = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      navigation.replace('Auth')
    }
  }, [isSignedIn])

  const onPress = () => {
    signOut()
    navigation.replace('Auth')
  }

  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={onPress} >
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default Home