import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from '@/context/authContext';
import LookupProvider from '@/context/lookupContext';
import { GlobalErrorProvide } from '@/context/globalErrorsContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Chivo: require('../assets/fonts/Chivo.ttf'),
    Quicksand: require('../assets/fonts/Quicksand.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <GlobalErrorProvide>
          <SessionProvider>
            <LookupProvider>
              <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="(login)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </LookupProvider>
          </SessionProvider> 
        </GlobalErrorProvide>
      </PaperProvider>
    </ThemeProvider>
  );
}
