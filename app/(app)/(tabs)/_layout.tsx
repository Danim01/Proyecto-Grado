import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName='home'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: route.name === 'analysis' ? 'none' : 'flex'
        }
      })}
    >
      <Tabs.Screen
        name="home"
      />
      <Tabs.Screen
        name="analysis"
        options={{
          headerShown: false
        }}
      />
    </Tabs>
  );
}
