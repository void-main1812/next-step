import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import Input from './Input';
import { height } from 'utils/Size';
import { Ionicons } from '@expo/vector-icons';

type DropDownProps = {
  data: string[];
  value: string;
  setValue: (item: string) => void;
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
};

const DropDownItem = ({ item, onPress }: { item: string; onPress: () => void }) => {
  const { theme } = useStyles();
  return (
    <Pressable
      style={{
        width: '100%',
        height: height(5),
        justifyContent: 'center',
        paddingHorizontal: height(2.5),
      }}
      onPress={onPress}>
      <Text style={typographyStyles(theme).body}>{item}</Text>
    </Pressable>
  );
};

const DropDown = ({
  data,
  value,
  setValue,
  label = 'Your Label',
  leftIcon = 'add-circle',
}: DropDownProps) => {
  const { theme, styles } = useStyles(styleSheet);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function onSelectItem(item: string) {
    setValue(item);
    setIsExpanded(false);
  }

  return (
    <View>
      <View style={{ position: 'relative' }}>
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Input
            label={label}
            value={value}
            leftIcon={leftIcon}
            rightIcon={isExpanded ? 'chevron-up' : 'chevron-down'}
            props={{ showSoftInputOnFocus: false, editable: false }}
          />
        </Pressable>
        <View style={styles.optionsContainer}>
          <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => (
              <DropDownItem item={item} onPress={() => onSelectItem(item)} />
            )}
            keyExtractor={(item) => item}
            style={{ display: isExpanded ? 'flex' : 'none' }}
          />
        </View>
      </View>
    </View>
  );
};

export default DropDown;

const styleSheet = createStyleSheet((theme) => ({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: 5,
    backgroundColor: theme.components.Input.backgroundColor,
    borderRadius: 10,
    position: 'absolute',
    top: height(10),
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 10,
    shadowColor: '#898989',
  },
}));
