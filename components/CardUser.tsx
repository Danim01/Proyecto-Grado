import { View, StyleSheet } from 'react-native'
import React, { ComponentProps } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
  label: string,
  value: string,
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"]
}

export default function CardUser({ label, value, icon }: Props) {
  return (
    <ThemedView style={styles.containerInformation}>
      <ThemedView style={styles.containerIconName}>
        <MaterialCommunityIcons name={icon} size={24} color="black" />
        <ThemedText>{label}:</ThemedText>
      </ThemedView>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  containerInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 16
  },
  containerIconName: {
    flexDirection: "row",
    gap: 10
  }
})