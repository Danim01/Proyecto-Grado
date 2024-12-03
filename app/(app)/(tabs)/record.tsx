import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

type Props = {}

export default function CapturerScreen({}: Props) {
  return (
    <ThemedView>
      <ThemedText>Record</ThemedText>
    </ThemedView>
  )
}