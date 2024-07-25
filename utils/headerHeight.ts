import { useSafeAreaInsets } from 'react-native-safe-area-context';

const headerheight = () => {
  const insets = useSafeAreaInsets();
  const estimatedHeaderHeight = insets.top;
  return estimatedHeaderHeight;
};

export default headerheight;
