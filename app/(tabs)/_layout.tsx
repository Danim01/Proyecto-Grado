import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
    initialRouteName='home'
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
      />
      <Tabs.Screen
        name="capturer"
      />
    </Tabs>
  );
}
