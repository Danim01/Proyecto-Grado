import { LookupCard } from "@/components/LookupCard"
import { ThemedView } from "@/components/ThemedView"
import { useLookup } from "@/context/lookupContext"
import { useRef } from "react"
import { ScrollView } from "react-native"
import { Button } from "react-native-paper"

export default function HistoryScreen() {
  const { paginatedLookups, getPaginatedLookups } = useLookup()
  const scrollViewRef = useRef<ScrollView | null>(null)

  const handlePageChange = (url: string | null) => {
    if (!url) return

    const urlObject = new URL(url)
    const query = Object.fromEntries(urlObject.searchParams.entries())
    const { limit, offset } = query
    getPaginatedLookups({limit: Number(limit), offset: Number(offset)})

    scrollViewRef.current?.scrollTo({})
  }
  return (
    <ScrollView ref={scrollViewRef}>
      <ThemedView>
        {
          paginatedLookups.results.map((lookup) => {
            return (
              <LookupCard lookup={lookup} key={lookup.id} />
            )
          })
        }
        <Button
          onPress={() => handlePageChange(paginatedLookups.previous)}
          disabled={paginatedLookups.previous === null}
        >
          Anterior
        </Button>
        <Button
          onPress={() => handlePageChange(paginatedLookups.next)}
          disabled={paginatedLookups.next === null}
        >
          Siguiente
        </Button>
      </ThemedView>
    </ScrollView>
  )
}