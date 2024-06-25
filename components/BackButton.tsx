import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.backButton}>
      <Feather name="chevron-left" size={16} color={theme.colors.azureRadiance} />
      <Text style={styles.backButtonText} onPress={onPress}>
        Back
      </Text>
    </View>
  );
};
const stylesheet = createStyleSheet((theme) => ({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  backButtonText: {
    color: theme.colors.azureRadiance,
    marginLeft: 4,
  },
}));
