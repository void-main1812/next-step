import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';
import UserContextMenu from './UserContextMenu';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/(root)';

type HeaderProps = {
  Name: string;
  ShowBackIcon?: boolean;
  ShowSettingsIcon?: boolean;
  RightIcon?: keyof typeof Ionicons.glyphMap;
  showLogo?: boolean;
  logo?: keyof typeof Ionicons.glyphMap;
};

const Header = ({
  Name,
  ShowBackIcon,
  ShowSettingsIcon,
  RightIcon,
  showLogo = true,
  logo = 'briefcase',
}: HeaderProps) => {
  const { theme, styles } = useStyles(stylesheet);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const iconColor = theme.components.Header.iconColor;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItemContainer}>
        {ShowBackIcon && (
          <Pressable onPress={handleBackPress}>
            <Ionicons name={'arrow-back'} size={24} color={iconColor} />
          </Pressable>
        )}
        {showLogo && <Ionicons name={logo} size={30} color={iconColor} />}
        <Text style={typographyStyles(theme).heading_3}>{Name}</Text>
      </View>
      <View style={styles.headerItemContainer}>
        {RightIcon && <Ionicons name={RightIcon} size={24} color={iconColor} />}
        {ShowSettingsIcon && (
          <Pressable onPress={toggleContextMenu}>
            <Ionicons name={'settings'} size={24} color={iconColor} />
          </Pressable>
        )}
      </View>
      <UserContextMenu isOpen={isContextMenuOpen} hide={toggleContextMenu} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  headerContainer: {
    height: height(8) + UnistylesRuntime.statusBar.height,
    width: width(100),
    paddingHorizontal: width(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: UnistylesRuntime.statusBar.height,
    backgroundColor: theme.components.Header.backgroundColor,
    elevation: 30,
    shadowColor: theme.components.Header.shadowColor,
  },

  headerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: height(1.6),
  },
}));

export default Header;
