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
    inset: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})