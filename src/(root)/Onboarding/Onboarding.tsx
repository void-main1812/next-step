import { useAuth } from '@clerk/clerk-expo';
import Button from 'components/Button';
import { RemoveableChips } from 'components/Chips';
import Container from 'components/Container';
import DropDown from 'components/DropDown';
import Input from 'components/Input';
import { useCreateUser } from 'hooks/queries/UserQueries';
import useSplitText from 'hooks/useSplitText';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { height } from 'utils/Size';

const Onboarding = ({ navigation }: any) => {
  const [location, setLocation] = useState<string>('Select Option');
  const [jobRole, setJobRole] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { theme, styles } = useStyles(styleSheet);
  const { array: skillList, removeItem } = useSplitText({ text: skills, setValue: setSkills });
  const { userId } = useAuth();

  const LocationOptions = ['Select Option', 'Remote', 'Onsite', 'Hybrid'];

  const userData = {
    userId: userId!,
    jobRole,
    skills: skillList,
    location,
  };

  const { CreateMutation } = useCreateUser();

  const handleSave = () => {
    setIsLoading(true);
    CreateMutation.mutate(userData, {
      onSuccess: () => {
        navigation.push('HomeNavigator');
      },
      onError: () => {
        setIsLoading(false);
        console.log('Error creating user');
      },
    });
  };

  return (
    <Container statusBarColor="transparent">
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={typographyStyles(theme).heading_1}>Select your Job Preferances</Text>
            <Text style={typographyStyles(theme).body}>
              Select preferences for job Recommendations
            </Text>
          </View>
          <KeyboardAvoidingView behavior="padding" style={{ width: '100%' }}>
            <View style={styles.inputContainer}>
              <Input
                keyboardType="default"
                label="Job Role"
                placeholder="Eg. Software Engineer"
                onChangeText={(text) => setJobRole(text)}
              />
              <Input
                keyboardType="default"
                label="Skills"
                placeholder="Eg. Html, Css..."
                value={skills}
                onChangeText={(text) => setSkills(text)}
              />
              {skillList.length > 0 ? (
                <FlatList
                  data={skillList}
                  horizontal
                  renderItem={({ item }) =>
                    item !== '' ? (
                      <View key={item} style={{ marginRight: 8 }}>
                        <RemoveableChips chipText={item} onpress={() => removeItem(item)} />
                      </View>
                    ) : null
                  }
                />
              ) : (
                <View style={styles.skillHelpTextContainer}>
                  <Text style={typographyStyles(theme).body}>
                    Please enter values saperated by comma (',') for example: Html, Css, etc.
                  </Text>
                </View>
              )}
              <DropDown
                label="Location"
                leftIcon="location"
                value={location}
                setValue={setLocation}
                data={LocationOptions}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.buttonContainer}>
            <Button
              text="Save & Continue"
              size="full"
              onPress={() => handleSave()}
              rightIcon="arrow-forward"
              isLoading={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Onboarding;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: height(100),
    paddingHorizontal: height(2.5),
    gap: height(6),
  },

  titleContainer: {
    gap: height(2),
  },

  inputContainer: {
    gap: height(2),
    width: '100%',
    zIndex: 1,
  },

  buttonContainer: {
    width: '100%',
    zIndex: -1,
  },

  skillHelpTextContainer: {
    paddingHorizontal: height(2.5),
    paddingVertical: height(1),
    borderWidth: 1,
    borderColor: theme.components.Input.placeholderColor,
    borderRadius: height(0.8),
  },
}));
