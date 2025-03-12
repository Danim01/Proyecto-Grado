import { LinkProps } from "expo-router";
import { ThemedText } from "./ThemedText";
import { ImageBackground, View } from 'react-native'
import { iconsMap, IconsType } from '@/constants/common';
import { Card } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from "expo-router";

interface CardProps {
  title: string,
  link: LinkProps["href"]
  icon: IconsType
}

const backgroundImage = require("@/assets/images/menu-card-background.png")

export default function MenuCard({ title, link, icon }: CardProps) {
  const iconName = iconsMap[icon]
  const router = useRouter()

  return (
    <Card
      contentStyle={{ height: 160, width: "100%", borderRadius: 8, overflow: 'hidden' }}
      onPress={() => router.navigate(link)}
    >
      <ImageBackground source={backgroundImage} resizeMode="cover" style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", height: "100%", alignItems: "center", width: 200 }}>
          <Card.Content style={{ alignItems: "center", gap: 8 }}>
            <MaterialCommunityIcons
              name={iconName as any}
              size={36}
              color="white"
              style={{
                width: 36,
                height: 36
              }}
            />
            <ThemedText type='title' style={{ color: "white", fontFamily: "Chivo", fontWeight: "medium", fontSize: 24 }}>{title}</ThemedText>
          </Card.Content>
        </View>
      </ImageBackground>
    </Card>
  )
}