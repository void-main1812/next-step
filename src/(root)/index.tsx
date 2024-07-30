import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from 'components/Header';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { height } from 'utils/Size';
import BottomTabBar from './components/BottomTabBar';
import HomeScreen from './home';
import { Ionicons } from '@expo/vector-icons';
import { typographyStyles } from 'styles/typography';
import Bookmarks from './Bookmarks';

export type RootStackParamList = {
  Home: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarBackground() {
          return <BottomTabBar />;
        },
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
            return <Header {...props} Name="Bookmarks" logo="bookmark" />;
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

export default HomeNavigator;

const styleSheet = createStyleSheet((theme, UnistylesRuntime) => ({
  bottomTabBar: {
    paddingBottom: spacing.height[4],
    position: 'absolute',
    right: spacing.height[6],
    left: spacing.height[6],
    bottom: spacing.height[6],
    borderRadius: spacing.height[4],
    height: height(10),
    overflow: 'hidden',
    borderColor: 'transparent',
    elevation: UnistylesRuntime.themeName === 'light' ? 30 : 0,
    shadowColor: theme.colors.Neutral[600],
  },

  tabBarItem: {
    paddingVertical: spacing.height[5],
    height: height(10),
  },
}));
