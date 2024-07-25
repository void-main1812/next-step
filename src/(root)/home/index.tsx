import { useAuth, useUser } from '@clerk/clerk-react';
import Container from 'components/Container';
import React, { useEffect } from 'react';
import { Image, Pressable, Text } from 'react-native';

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
  }

  return (
      <Container>
        <Text>HomeScreen</Text>
        {user?.imageUrl && (
          <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100 }} />
        )}
        <Pressable onPress={onPress}>
          <Text style={{color: 'white'}} >Sign Out</Text>
        </Pressable>
      </Container>
  );
}

export default HomeScreen