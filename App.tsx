import './styles/unistyles';

import 'react-native-gesture-handler';

import RootStack from './src/navigation';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClashDisplay-Semibold': require('./assets/fonts/ClashDisplay-Semibold.otf'),
    'ClashDisplay-Medium': require('./assets/fonts/ClashDisplay-Medium.otf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.otf'),
  });

  return <RootStack />;
}
