import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Container from 'components/Container';
import Header from 'components/Header';
import { useGetUser } from 'hooks/queries/UserQueries';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';
import Bookmarks from './Bookmarks';
import HomeScreen from './home';
import Onboarding from './Onboarding/Onboarding';
import EditProfile from './EditProfile';

export type RootStackParamList = {
  HomeNavigator: undefined;
  Onboarding: undefined;
  EditProfile: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.bottomTabBar,
        tabBarActiveTintColor: theme.components.tabBarIcons.active,
        tabBarInactiveTintColor: theme.components.tabBarIcons.inactive,
        tabBarLabelStyle: [typographyStyles(theme).body],
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header(props) {
            return <Header {...props} Name="Next Step" ShowSettingsIcon />;
          },
          tabBarItemStyle: styles.tabBarItem,
          tabBarIcon(props) {
            return (
              <Ionicons
                name="home"
                size={30}
                color={
                  props.focused
                    ? theme.components.tabBarIcons.active
                    : theme.components.tabBarIcons.inactive
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmarks}
        options={{
          header(props) {
            return <Header {...props} Name="Bookmarks" logo="bookmark" ShowSettingsIcon />;
          },
          tabBarItemStyle: styles.tabBarItem,
          tabBarIcon(props) {
            return (
              <Ionicons
                name="bookmark"
                size={30}
                color={
                  props.focused
                    ? theme.components.tabBarIcons.active
                    : theme.components.tabBarIcons.inactive
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { userId } = useAuth();

  const { userData, status: userStatus } = useGetUser(userId!);
  const { theme } = useStyles();

  if (userStatus === 'pending') {
    return (
      <Container statusBarColor="transparent">
        <View
          style={{
            flex: 1,
            height: height(100),
            width: width(100),
            justifyContent: 'center',
            alignItems: 'center',
            gap: spacing.height[4],
          }}>
          <ActivityIndicator size="large" color={theme.components.Text.heading_1} />
          <Text style={typographyStyles(theme).heading_3}>Fetching User...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ animation: 'fade' }}
      initialRouteName={userData ? 'HomeNavigator' : 'Onboarding'}>
      <Stack.Screen
        name="HomeNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          header(props) {
            return <Header {...props} Name="Edit your Profile" ShowBackIcon showLogo={false} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styleSheet = createStyleSheet((theme, UnistylesRuntime) => ({
  bottomTabBar: {
    paddingBottom: spacing.height[4],
    position: 'absolute',
    right: spacing.height[6],
    left: spacing.height[6],
    bottom: spacing.height[6],
    borderRadius: spacing.height[4],
    height: height(10),
    backgroundColor: theme.components.Statusbar.color,
    overflow: 'hidden',
    elevation: UnistylesRuntime.themeName === 'light' ? 20 : 0,
    shadowColor: theme.colors.Neutral[600],
    borderColor: theme.components.Input.placeholderColor,
    borderWidth: 0.5,
  },

  tabBarItem: {
    paddingVertical: spacing.height[5],
    height: height(10),
  },
}));
