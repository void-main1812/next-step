import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Container from 'components/Container';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { height } from 'utils/Size';
import { Image } from 'expo-image';
import { typographyStyles } from 'styles/typography';
import { useGetUser } from 'hooks/queries/UserQueries';
import { Chips } from 'components/Chips';
import Button from 'components/Button';

const EditProfile = () => {
  const { user } = useUser();
  const { userId } = useAuth();

  const { theme, styles } = useStyles(styleSheet);

  const { userData } = useGetUser(userId!);

  return (
    <Container>
      <View style={styles.userInfoContainer}>
        <View>
          <Image source={{ uri: user?.imageUrl }} style={styles.imageContainer} />
        </View>
        <View style={styles.userNameContainer}>
          <Text style={typographyStyles(theme).heading_3}>{user?.fullName}</Text>
          <Text style={typographyStyles(theme).body}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      <View style={styles.preferancesContainer}>
        <Text style={typographyStyles(theme).heading_3}>Edit Your Preferances</Text>
        <View style={{ gap: spacing.height[3] }}>
          <Text style={typographyStyles(theme).body}>Job Role</Text>
          <Text style={styles.preferanceContent}>{userData?.jobRole}</Text>
        </View>
        <View style={{ gap: spacing.height[3] }}>
          <Text style={typographyStyles(theme).body}>Skills</Text>
          <FlatList
            data={userData?.skills}
            horizontal
            renderItem={({ item }) => (
              <View style={{ marginRight: spacing.height[4] }}>
                <Chips chipText={item} />
              </View>
            )}
            keyExtractor={(item) => item}
          />
        </View>
        <View style={{ gap: spacing.height[3] }}>
          <Text style={typographyStyles(theme).body}>Location</Text>
          <Text style={styles.preferanceContent}>{userData?.location}</Text>
        </View>
      </View>
      <View style={styles.buttonConainter}>
        <Button size="full" text="Edit your Profile" variant="secondary" rightIcon="pencil" />
      </View>
    </Container>
  );
};

export default EditProfile;

const styleSheet = createStyleSheet((theme) => ({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: spacing.height[6],
    padding: spacing.height[6],
  },

  imageContainer: {
    height: height(10),
    width: height(10),
    borderRadius: height(5),
  },

  userNameContainer: {
    gap: spacing.height[2],
  },

  preferancesContainer: {
    paddingHorizontal: spacing.height[6],
    gap: spacing.height[6],
  },

  preferanceContent: {
    ...typographyStyles(theme).special,
    width: '100%',
    padding: spacing.height[6],
    borderRadius: spacing.height[4],
    backgroundColor: theme.components.Input.backgroundColor,
  },

  buttonConainter: {
    position: 'absolute',
    bottom: 200,
    right: spacing.height[6],
    left: spacing.height[6],
  },
}));
