import { Card } from '@/components/Card'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
  return (
    <ThemedView>
      <Card title='Análisis' link='/analysis' />
      <Card title='Historial' link='/history' />
      <Card title='Perfil' link='/profile' />
      <Card title='Editar perfil' link='/editProfile' />
      <Card title='Estadisticas' link='/statistics' />
    </ThemedView>
  )
}