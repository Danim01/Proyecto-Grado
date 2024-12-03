import { Card } from '@/components/Card'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
  return (
    <ThemedView>
      <Card title='Análisis' link='/(tabs)/analysis' />
      <Card title='Historial' link='/home' />
    </ThemedView>
  )
}