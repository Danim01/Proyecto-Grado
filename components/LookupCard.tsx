import { Lookup } from "@/types/analyzeImage";
import { ThemedView } from "./ThemedView";
import { Image } from "react-native";
import { ThemedText } from "./ThemedText";

export function LookupCard({ lookup }: { lookup: Lookup }) {
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

  return (
    <ThemedView key={id}>
      <ThemedView>
        <Image
          source={{
            uri: url
          }}
          width={100}
          height={100}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText>{illnessName}</ThemedText>
        <ThemedText>{locationName}</ThemedText>
      </ThemedView>
    </ThemedView>
  )
}