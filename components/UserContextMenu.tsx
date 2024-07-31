import { Ionicons } from '@expo/vector-icons';
import Saperator from 'components/Saperator';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';

type contextMenuOptionProps = {
  onPress: () => void;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: 'normal' | 'danger';
};

const ContextMenuOption = ({ onPress, color = 'normal', text, icon }: contextMenuOptionProps) => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Pressable onPress={onPress} style={styles.contextMenuItem}>
      <View style={styles.contextMenuItemContaier}>
        <Ionicons
          name={icon}
          size={spacing.height[6]}
          color={color === 'danger' ? theme.colors.Rose[500] : theme.components.Input.color}
        />
        <Text
          style={[
            typographyStyles(theme).body,
            { color: color === 'danger' ? theme.colors.Rose[500] : theme.components.Input.color },
          ]}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

const UserContextMenu = ({ isOpen, hide }: { isOpen: boolean; hide: () => void }) => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <Modal transparent visible={isOpen} animationType="none" onRequestClose={hide}>
      <View style={styles.contextMenuContainer}>
        <ContextMenuOption icon="person" text="Edit Profile" onPress={() => {}} />
        <Saperator />
        <ContextMenuOption icon="log-out" text="Logout" color="danger" onPress={() => {}} />
      </View>
      <Pressable onPress={hide}>
        <View style={styles.touchOutside} />
      </Pressable>
    </Modal>
  );
};

export default UserContextMenu;

const styleSheet = createStyleSheet((theme, UnistylesRuntime) => ({
  contextMenuContainer: {
    position: 'absolute',
    top: height(7),
    right: spacing.height[6],
    backgroundColor: theme.components.Input.backgroundColor,
    padding: spacing.height[4],
    borderRadius: spacing.height[2],
    borderWidth: UnistylesRuntime.themeName === 'light' ? 0.5 : 0.2,
    borderColor: theme.components.Input.labelColor,
    gap: spacing.height[2],
    elevation: UnistylesRuntime.themeName === 'light' ? 20 : 0,
    shadowColor: 'black',
    zIndex: 1,
  },

  contextMenuItem: {
    padding: spacing.height[2],
  },

  contextMenuItemContaier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.height[4],
    minWidth: width(40),
  },

  touchOutside: {
    height: height(100),
    width: width(100),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
    backgroundColor: 'transparent',
  },
}));
