import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { height, width } from 'utils/Size';

type containerProps = {
  children: ReactNode;
  scrollable?: boolean;
  statusBarColor?: string;
  statusBarHidden?: boolean;
};

const Container = ({
  children,
  scrollable = false,
  statusBarColor,
  statusBarHidden = false,
}: containerProps) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <>
      <StatusBar
        style={'auto'}
        backgroundColor={statusBarColor ? statusBarColor : theme.components.Statusbar.color}
        hidden={statusBarHidden}
      />
      <View style={{ backgroundColor: theme.components.Background.color }}>
        <ScrollView
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={scrollable}
          contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.components.Background.color,
    minHeight: height(100) + UnistylesRuntime.statusBar.height * 2,
    minWidth: width(100),
    gap: spacing.height[10],
    paddingTop: spacing.height[5],
  },
  statusBar: {
    backgroundColor: theme.components.Statusbar.color,
  },
}));

export default Container;
