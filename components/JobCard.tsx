import { View, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { typographyStyles } from 'styles/typography';
import { Image } from 'expo-image';
import { spacing } from 'styles/spacing';
import { useImageColors } from 'hooks/useImageColors';
import { Chips } from './Chips';
import { Ionicons } from '@expo/vector-icons';

type jobCardDetails = {
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
  companyLogo: any;
  jobId: string;
};

const ImageHeight = 50;
const ImageWidth = 50;

const JobCard = ({
  jobTitle,
  companyName,
  location,
  salary,
  jobType,
  companyLogo,
  jobId,
}: jobCardDetails) => {
  const { theme, styles } = useStyles(styleSheet);

  const { colors } = useImageColors(companyLogo);

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
    <View style={styles.jobCardContainer}>
      <View style={styles.bookmarkContainer}>
        <Ionicons name="bookmark-outline" size={24} color={theme.colors.Blue[500]} />
      </View>
      <View style={styles.cardHeader}>
        <View
          style={{
            backgroundColor: dominantColor,
            elevation: 10,
            shadowColor: dominantColor,
            borderRadius: spacing.height[2],
            maxHeight: ImageHeight,
            maxWidth: ImageWidth,
          }}>
          <Image source={companyLogo} style={styles.companyImage} contentFit="contain" />
        </View>
        <View style={styles.cardHeaderDetails}>
          <Text style={typographyStyles(theme).heading_3}>{companyName}</Text>
          <Text style={typographyStyles(theme).body_small}>{location}</Text>
        </View>
      </View>
      <Text style={typographyStyles(theme).heading_3}>{jobTitle}</Text>
      <View style={styles.cardExtraDetails}>
        <Chips chipText={jobType} />
        <Chips chipText={`${salary}/year`} variant="favourable" icon="cash" />
      </View>
    </View>
  );
};

export default JobCard;

const styleSheet = createStyleSheet((theme) => ({
  jobCardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: spacing.height[6],
    padding: spacing.height[6],
    backgroundColor: theme.components.Input.backgroundColor,
    borderRadius: spacing.height[4],
    width: '100%',
  },

  companyImage: {
    height: ImageHeight,
    width: ImageWidth,
    borderRadius: spacing.height[2],
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    gap: spacing.height[4],
  },

  cardHeaderDetails: {
    gap: spacing.height[2],
  },

  cardExtraDetails: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: spacing.height[4],
  },

  bookmarkContainer: {
    position: 'absolute',
    top: spacing.height[6],
    right: spacing.height[6],
  },
}));
