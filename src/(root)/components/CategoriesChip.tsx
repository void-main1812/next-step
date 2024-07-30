import { Chips } from 'components/Chips';
import React from 'react';
import { Pressable } from 'react-native';
import { spacing } from 'styles/spacing';

const CategoriesChip = ({ item, onPress }: { item: string; onPress: () => void }) => {
  return (
    <>
      <Pressable style={{ marginRight: spacing.height[5] }} onPress={onPress}>
        <Chips chipText={item} />
      </Pressable>
    </>
  );
};

export default CategoriesChip;
