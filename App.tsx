import { useFonts, 
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import { Routes } from './src/routes';


export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if(!fontsLoaded) {
    return null;
  }

  return (

      <ThemeProvider theme={theme}>
          <StatusBar barStyle={'light-content'} />
          <Routes />
      </ThemeProvider>
  );
}