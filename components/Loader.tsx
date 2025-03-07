import { ActivityIndicator } from "react-native-paper"
import { ThemedView } from "./ThemedView"
import { ThemedText } from "./ThemedText"
import { StyleSheet } from "react-native"


export default function Loader({text}: {text: string}) {
  return (
    <ThemedView style={styles.loadingContainer}>
      <ActivityIndicator size='large'/>
      <ThemedText type='defaultSemiBold'>{text}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom:0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
    gap: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})