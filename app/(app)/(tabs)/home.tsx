import { Card } from '@/components/Card'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
  return (
    <ThemedView>
      <Card title='Análisis' link='/analysis' />
      <Card title='Historial' link='/history' />
    </ThemedView>
  )
}