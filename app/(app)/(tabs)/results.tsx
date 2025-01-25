import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLookup } from '@/context/lookupContext'
import { useEffect } from 'react'

export default function ResultsView() {
  const { lastLookup } = useLookup()

  useEffect(() => {
    console.log(lastLookup)
  }, [lastLookup])

  return (
    <ThemedView>
      <ThemedText>Record</ThemedText>
      
    </ThemedView>
  )
}