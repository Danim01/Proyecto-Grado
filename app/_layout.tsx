import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { MD3LightTheme as DefaultPaperTheme, PaperProvider } from 'react-native-paper'
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from '@/context/authContext';
import { GlobalErrorProvide } from '@/context/globalErrorsContext';
import getCurrentLocation from '@/utils/getCurrentLocation';

const theme = {
  ...DefaultPaperTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultPaperTheme.colors,
    "primary": "rgb(5, 109, 55)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(156, 246, 177)",
    "onPrimaryContainer": "rgb(0, 33, 12)",
    "secondary": "rgb(80, 99, 82)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(211, 232, 211)",
    "onSecondaryContainer": "rgb(14, 31, 18)",
    "tertiary": "rgb(0, 104, 116)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(151, 240, 255)",
    "onTertiaryContainer": "rgb(0, 31, 36)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 253, 247)",
    "onBackground": "rgb(25, 28, 25)",
    "surface": "rgb(252, 253, 247)",
    "onSurface": "rgb(25, 28, 25)",
    "surfaceVariant": "rgb(221, 229, 218)",
    "onSurfaceVariant": "rgb(65, 73, 65)",
    "outline": "rgb(113, 121, 113)",
    "outlineVariant": "rgb(193, 201, 191)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 46)",
    "inverseOnSurface": "rgb(240, 241, 236)",
    "inversePrimary": "rgb(129, 217, 151)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(240, 246, 237)",
      "level2": "rgb(232, 242, 232)",
      "level3": "rgb(225, 237, 226)",
      "level4": "rgb(222, 236, 224)",
      "level5": "rgb(217, 233, 220)"
    },
    "surfaceDisabled": "rgba(25, 28, 25, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 25, 0.38)",
    "backdrop": "rgba(43, 50, 43, 0.4)"
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    Chivo: require('../assets/fonts/Chivo.ttf'),
    Quicksand: require('../assets/fonts/Quicksand.ttf')
  });

  useEffect(() => {
    getCurrentLocation()
  }, [])

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
      <PaperProvider theme={theme}>
        <GlobalErrorProvide>
          <SessionProvider>
            <Stack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="(login)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SessionProvider>
        </GlobalErrorProvide>
      </PaperProvider>
    </ThemeProvider>
  );
}
