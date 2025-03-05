import { Colors } from '@/constants/Colors';
import { useSession } from '@/context/authContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Button } from 'react-native-paper';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { signOut } = useSession()

  return (
      <Tabs
        initialRouteName='home'
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarShowLabel: false,
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            header: () => (
              <Button onPress={signOut}>cerrar sesión</Button>
            )
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            // href: null
          }}
        />
        <Tabs.Screen
          name="profile"
        />
      </Tabs>
  );
}
