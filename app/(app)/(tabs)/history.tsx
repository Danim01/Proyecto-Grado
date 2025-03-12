import { LookupCard } from "@/components/LookupCard"
import { ThemedText } from "@/components/ThemedText"
import { useLookup } from "@/context/lookupContext"
import { useRef } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"

export default function HistoryScreen() {
  const { paginatedLookups, getPaginatedLookups, loading } = useLookup()
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
      <View style={styles.container}>
        {
          loading && (
            <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>Cargando...</ThemedText>
          )
        }
        {
          paginatedLookups.results.map((lookup) => {
            return (
              <LookupCard lookup={lookup} key={lookup.id} />
            )
          })
        }
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => handlePageChange(paginatedLookups.previous)}
            disabled={paginatedLookups.previous === null}
            mode="contained-tonal"
          >
            Anterior
          </Button>
          <Button
            onPress={() => handlePageChange(paginatedLookups.next)}
            disabled={paginatedLookups.next === null}
            mode="contained-tonal"
          >
            Siguiente
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF7F1',
    padding: 16,
    gap: 24,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8
  }
})