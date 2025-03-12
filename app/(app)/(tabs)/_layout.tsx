import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import Header, { type RouteType } from '@/components/Header';
import { IconButton } from 'react-native-paper';
import { iconsMap, IconsType } from '@/constants/common';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

const pagesToHideTabBar = ['analysis']

export default function TabLayout() {
  return (
      <Tabs
        initialRouteName='home'
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            overflow: 'hidden',
            bottom: pagesToHideTabBar.includes(route.name) ? -100 : 0,
            display: pagesToHideTabBar.includes(route.name) ? 'none' : 'flex',
          },
          animation: 'fade',
          tabBarIcon: ({ size, color, focused }) => {
            const routeName = route.name as IconsType
            const iconName = iconsMap[routeName] || 'home';
            return (
              <View style={{ position: "relative" }}>
                {
                  focused && (
                    <View
                      style={{
                        position: "absolute",
                        width: 50,
                        left: -12,
                        height: 60,
                        borderTopLeftRadius: 9999,
                        borderTopRightRadius: 9999,
                        bottom: -30,
                        backgroundColor: "#234F30"
                      }}
                    />
                  )
                }
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={size}
                  color={color}
                />
              </View>
            )
          }
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            header: () => (
              <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 16, alignItems: "center" }}>
                <ThemedText style={{ fontFamily: "Chivo", fontSize: 24, fontWeight: "semibold" }}>
                  ¡Bienvenid@ a Eva!
                </ThemedText>
                <Link href={"/profile"} accessibilityLabel='Perfil'>
                <MaterialCommunityIcons
                  name={iconsMap.profile as any}
                  size={32}
                  color="#838383"
                  style={{
                    width: 32,
                    height: 32
                  }}
                />
                </Link>
              </View>
            )
          }}
        />
        <Tabs.Screen
          name="analysis"
          options={{
            header: ({ navigation }) => (
              <View style={{backgroundColor: "transparent", position: "absolute", top: 0}}>
                <IconButton
                  icon={"arrow-left"}
                  iconColor='white'
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 9999,
                    marginTop: 16,
                    marginLeft: 16,
                  }}
                  onPress={() => navigation.goBack()}
                />
              </View>
            )
          }}
        />
        <Tabs.Screen
          name='history'
          options={{
            header: ({ route }) => (
              <Header route={route.name as RouteType} />
            )
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            header: ({ route }) => (
              <Header route={route.name as RouteType} />
            )
          }}
        />
      </Tabs>
  );
}
