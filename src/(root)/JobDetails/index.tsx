import { View, Text, Platform, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import Container from 'components/Container';
import Jobdata from 'mock/JobsData.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useImageColors } from 'hooks/useImageColors';
import { height, width } from 'utils/Size';
import { spacing } from 'styles/spacing';
import { Ionicons } from '@expo/vector-icons';

const JobDetails = ({ route, navigation }: any) => {
  const { id } = route.params;
  const { theme, styles } = useStyles(styleSheet);

  const requiredJob = Jobdata.find((job) => job.id === id);

  const { colors } = useImageColors(requiredJob?.companyLogo);

  const [dominantColor, setDominantColor] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // @ts-ignore
      setDominantColor(colors?.color);
    } else {
      // @ts-ignore
      setDominantColor(colors?.dominant);
    }
  }, [Platform, colors, dominantColor]);

  return (
    <Container statusBarColor="transparent">
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable>
            <Ionicons name="arrow-back" size={24} color={theme.colors.Blue[500]} />
          </Pressable>
          <Pressable>
            <Ionicons name="bookmark" size={24} color={theme.colors.Blue[500]} />
          </Pressable>
        </View>
        <View>
          <View style={styles.jobDetailsContainer}>
            <View
              style={{
                height: height(12),
                width: height(12),
                borderRadius: spacing.height[5],
                elevation: 10,
                shadowColor: dominantColor,
              }}>
              <Image source={{ uri: requiredJob?.companyLogo }} style={[styles.companyLogo]} />
            </View>
            <View style={styles.jobDetailsText}>
              <Text style={styles.jobTitle}>{requiredJob?.jobTitle}</Text>
              <Text style={typographyStyles(theme).body}>{requiredJob?.companyName}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default JobDetails;

const styleSheet = createStyleSheet((theme) => ({
  companyLogo: {
    height: height(12),
    width: height(12),
    borderRadius: spacing.height[5],
  },

  jobDetailsContainer: {
    flexDirection: 'row',
    gap: spacing.height[8],
    paddingHorizontal: spacing.height[6],
    alignItems: 'center',
  },

  jobDetailsText: {
    gap: spacing.height[3],
  },

  jobTitle: {
    ...typographyStyles(theme).heading_1,
    width: width(60),
  },

  header: {
    padding: spacing.height[6],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
