import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { theme } = useStyles();

  return (
    <View style={theme.components.container}>
      <Text style={theme.components.title}>{title}</Text>
      <View style={theme.components.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
