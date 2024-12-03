import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from '@/context/authContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <SessionProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PaperProvider>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(login)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
