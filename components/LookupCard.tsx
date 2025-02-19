import { Lookup } from "@/types/analyzeImage";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Card } from "react-native-paper";
import { useLookup } from "@/context/lookupContext";
import { useRouter } from "expo-router";

export function LookupCard({ lookup }: { lookup: Lookup }) {
  const { changeLastLookup } = useLookup()
  const router = useRouter()
  const {
    id,
    enfermedad: {
      nombre: illnessName
    },
    ubicacion: {
      nombre: locationName
    },
    imagen: {
      url
    }
  } = lookup

  const handleResults = () => {
    changeLastLookup(lookup)
    router.navigate("/results")
  }

  return (
    <Card key={id} onPress={handleResults}>
      <ThemedView>
        <Card.Cover
          source={{
            uri: url
          }}
          width={100}
          height={100}
        />
      </ThemedView>
      <Card.Content>
        <Card.Title title={illnessName} />
        <ThemedText>{locationName}</ThemedText>
      </Card.Content>
    </Card>
  )
}