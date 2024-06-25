import { SafeAreaView } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useStyles();

  return <SafeAreaView style={theme.components.container}>{children}</SafeAreaView>;
};
