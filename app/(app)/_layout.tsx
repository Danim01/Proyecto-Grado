import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/authContext';
import LookupProvider from '@/context/lookupContext';
import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';


export default function AppLayout() {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return (
      <ThemedView>
        <ThemedText type='title'>Cargando...</ThemedText>
      </ThemedView>
    )
  }

  if (!session?.refresh || !session.access) {
    return <Redirect href="/" />
  }

  return (
    <LookupProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="analysis" options={{ headerShown: false }} />
      </Stack>
    </LookupProvider>
  );
}
