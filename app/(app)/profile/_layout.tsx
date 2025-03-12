import { Stack } from "expo-router";
import Header, { RouteType } from '@/components/Header';

export default function ProfileLayout() {
  return (
    <Stack initialRouteName="profile">
      <Stack.Screen
        name="profile"
        options={{
          header: ({ route, navigation }) => (
            <Header route={route.name as RouteType} navigation={navigation} />
          )
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          header: ({ route, navigation }) => (
            <Header route={route.name as RouteType} navigation={navigation} />
          )
        }}
      />
      <Stack.Screen
        name="editPassword"
        options={{
          header: ({ route, navigation }) => (
            <Header route={route.name as RouteType} navigation={navigation} />
          )
        }}
      />
    </Stack>
  )
}