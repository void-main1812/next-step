import { useEffect, useState } from 'react';
import { ImageColorsResult, getColors } from 'react-native-image-colors';
import { useStyles } from 'react-native-unistyles';

export const useImageColors = (image: any) => {
  const [colors, setColors] = useState<ImageColorsResult | null>(null);

  const { theme } = useStyles();

  useEffect(() => {
    getColors(image, {
      fallback: theme.colors.Neutral[400],
      cache: true,
      key: image,
    }).then((colors) => setColors(colors));
  }, [image]);

  return { colors };
};
