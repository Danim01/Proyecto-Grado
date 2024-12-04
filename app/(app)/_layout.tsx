import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/authContext';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';


export default function AppLayout() {
  const { session, isLoading } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="analysis" options={{ headerShown: false }} />
    </Stack>
  );
}
