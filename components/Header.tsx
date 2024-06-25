import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { height, width } from 'utils/Size';
import { typographyStyles } from 'styles/typography';

type HeaderProps = {
  Name: string;
  ShowBackIcon?: boolean;
  ShowSettingsIcon?: boolean;
  RightIcon?: keyof typeof Ionicons.glyphMap;
};

const Header = ({ Name, ShowBackIcon, ShowSettingsIcon, RightIcon }: HeaderProps) => {
  const { theme, styles } = useStyles(stylesheet);

  const iconColor = theme.components.Header.iconColor;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerItemContainer}>
        {ShowBackIcon && <Ionicons name={'arrow-back'} size={24} color={iconColor} />}
        <Text style={typographyStyles(theme).heading_3}>{Name}</Text>
      </View>
      <View style={styles.headerItemContainer}>
        {RightIcon && <Ionicons name={RightIcon} size={24} color={iconColor} />}
        {ShowSettingsIcon && <Ionicons name={'settings'} size={24} color={iconColor} />}
      </View>
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
