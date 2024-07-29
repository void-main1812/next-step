import { useAuth, useUser } from '@clerk/clerk-react';
import Container from 'components/Container';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import { useGetUser } from 'hooks/queries/UserQueries';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';

const HomeScreen = ({ navigation }: any) => {
  const [dropDownValue, setDropDownValue] = useState<string>('Select Location');

  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const { userId } = useAuth();
  const { status, userData } = useGetUser(userId!);

  const { theme } = useStyles();

  const data = ['Select Location', 'Remote', 'Onsite', 'Hybrid'];

  useEffect(() => {
    if (!isSignedIn) {
      navigation.replace('Auth');
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (status === 'success') {
      console.log(userData?.skills);
    } else {
      console.log('Pending');
    }
  }, [userData]);

  return (
    <Container>
      <Text style={{ color: 'white' }}>This is Home Screen</Text>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />
      <Text style={[typographyStyles(theme).heading_3, { letterSpacing: 0 }]}>
        Welcome {user?.firstName}
      </Text>
      <Text style={[typographyStyles(theme).body_small, { letterSpacing: 0 }]}>
        Your email Address is {user?.primaryEmailAddress?.emailAddress}
      </Text>
      <Input
        label="Search for Job"
        placeholder="Eg: Software Engineer in Banglore"
        leftIcon="search"
        onChangeText={() => {}}
      />
      <DropDown
        label="Location"
        leftIcon="location"
        value={dropDownValue}
        setValue={setDropDownValue}
        data={data}
      />
    </Container>
  );
};

export default HomeScreen;
