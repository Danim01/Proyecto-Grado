import MenuCard from '@/components/MenuCard'
import { ScrollView } from 'react-native'

export default function HomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        justifyContent: "space-between",
        gap: 16,
        flex: 1,
        backgroundColor: '#EDF7F1',
      }}
    >
      <MenuCard title='Análisis' link='/analysis' icon='analysis' />
      <MenuCard title='Historial' link='/history' icon='history' />
      <MenuCard title='Estadísticas' link='/statistics' icon='statistics' />
    </ScrollView>
  )
}