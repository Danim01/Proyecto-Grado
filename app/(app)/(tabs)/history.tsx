import { LookupCard } from "@/components/LookupCard"
import { useLookup } from "@/context/lookupContext"
import { ScrollView } from "react-native"

export default function HistoryScreen() {
  const { paginatedLookups } = useLookup()

  return (
    <ScrollView>
      {
        paginatedLookups.results.map((lookup) => (
          <LookupCard lookup={lookup} key={lookup.id} />
        ))
      }
    </ScrollView>
  )
}