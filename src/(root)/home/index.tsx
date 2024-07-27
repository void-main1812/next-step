import { useAuth, useUser } from '@clerk/clerk-react';
import Button from 'components/Button';
import Container from 'components/Container';
import DropDown from 'components/DropDown';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';

const HomeScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [skills, setSkills] = useState<string>('');
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [dropDownValue, setDropDownValue] = useState<string>('Select Location');

  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const { theme } = useStyles();

  const data = ['Select Location', 'Remote', 'Onsite', 'Hybrid'];

  useEffect(() => {
    if (!isSignedIn) {
      navigation.replace('Auth');
    }
  }, [isSignedIn]);

  const onPress = () => {
    signOut();
  };

  function onChangeText(text: string) {
    setInput(text);
  }

  if (input[input.length - 1] === ',') {
    console.log(true);
    let string = input.slice(0, -1);
    setSkills(string);
    setInput('');
  }

  if (!skillsArray.includes(skills)) {
    setSkillsArray([...skillsArray, skills]);
  }

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
      <DropDown label='Location' leftIcon='location' value={dropDownValue} setValue={setDropDownValue} data={data} />
      <Button onPress={onPress} text="Sign Out" size="full" />
    </Container>
  );
};

export default HomeScreen;
