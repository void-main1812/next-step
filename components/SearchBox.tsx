import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';

type SearchBoxProps = {
  placeholder?: string;
  showFilters?: boolean;
  onPressFilter?: () => void;
  onChangeText?: (text: string) => void;
  onSubmit?: (item: string) => void;
};

const SearchBox = ({
  placeholder = 'Search through the App',
  showFilters = false,
  onPressFilter,
  onChangeText,
  onSubmit = (text: string) => console.log(text),
}: SearchBoxProps) => {
  const { theme, styles } = useStyles(styleSheet);

  return (
    <>
      <View style={styles.container}>
        <Ionicons
          name="search"
          size={spacing.icons.medium}
          color={theme.components.Input.labelColor}
        />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={onChangeText}
          placeholderTextColor={theme.components.Input.placeholderColor}
          onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
        />
        {showFilters && (
          <Ionicons
            name="options"
            size={spacing.icons.medium}
            color={theme.components.Input.labelColor}
            onPress={onPressFilter}
          />
        )}
      </View>
    </>
  );
};

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.components.Input.backgroundColor,
    borderRadius: spacing.height[2],
    paddingVertical: spacing.height[4],
    paddingHorizontal: spacing.height[6],
    gap: spacing.height[2],
  },
  input: {
    ...typographyStyles(theme).body,
    color: theme.components.Input.labelColor,
    flex: 1,
    marginLeft: spacing.height[2],
  },
}));

export default SearchBox;
