import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

const HomeScreen = ({navigation}: any) => {

  const {signOut, isSignedIn} = useAuth();
  const { user } = useUser();

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
      <Text>HomeScreen</Text>
      {user?.imageUrl && <Image source={{uri: user?.imageUrl}} style={{width: 100, height: 100}} />}
      <Pressable onPress={onPress} >
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen