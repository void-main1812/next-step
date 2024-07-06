import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { height } from 'utils/Size';

// types for the Input component props
type InputProps = {
  rightIcon?: keyof typeof Ionicons.glyphMap;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
};

const Input = ({
  rightIcon,
  leftIcon,
  label = 'Label Here',
  placeholder = 'Placeholder',
  onChangeText,
  secureTextEntry = false,
  onRightIconPress,
  keyboardType = 'default',
}: InputProps) => {
  // destructuring the theme and styles from the useStyles hook
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.Container}>
      <Text style={typographyStyles(theme).body}>{label}</Text>
      <View style={styles.inputContainer}>
        {/* Left-Icon */}
        {leftIcon && (
          <Ionicons name={leftIcon} size={18} color={theme.components.Input.labelColor} />
        )}
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          style={styles.input}
          keyboardType={keyboardType}
          placeholderTextColor={theme.components.Input.placeholderColor}
          onChangeText={onChangeText}
        />
        {/* Right-Icon */}
        {rightIcon && (
          <Pressable onPress={onRightIconPress}>
            <Ionicons name={rightIcon} size={18} color={theme.components.Input.labelColor} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  Container: {
    backgroundColor: theme.components.Input.backgroundColor,
    borderRadius: height(0.8),
    paddingVertical: height(1.2),
    paddingHorizontal: height(2.4),
    gap: height(1.2),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: height(2),
  },
  input: {
    ...typographyStyles(theme).special,
    flex: 1,
    color: theme.components.Input.color,
  },
}));

export default Input;
