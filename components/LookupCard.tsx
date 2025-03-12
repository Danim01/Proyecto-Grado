import { Lookup } from "@/types/analyzeImage";
import { ThemedText } from "./ThemedText";
import { Card } from "react-native-paper";
import { useLookup } from "@/context/lookupContext";
import { useRouter } from "expo-router";
import { format } from "@formkit/tempo"
import { StyleSheet, Text, View } from 'react-native'

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
    },
    "fecha_creacion": date
  } = lookup

  const dateObject = new Date(date)

  const handleResults = () => {
    changeLastLookup(lookup)
    router.navigate("/results")
  }

  return (
    <Card key={id} onPress={handleResults} contentStyle={styles.cardContainer}>
      <Card.Cover
        source={{
          uri: url
        }}
        width={100}
        height={100}
        style={styles.image}
      />
      <Card.Content style={styles.content}>
        <Card.Title
          title={
            <Text style={styles.title}>{illnessName}</Text>
          }
          style={{ paddingLeft: 0 }}
        />
        <View>
          <ThemedText style={styles.data}>{locationName}</ThemedText>
          <ThemedText style={styles.data}>{format(dateObject, "MMMM D, YYYY h:mm a")}</ThemedText>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#2D6743",
    alignItems: 'center',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 2,
  },
  content: {
    width: "100%",
  },
  title: {
    fontFamily: 'Chivo',
    fontWeight: 'semibold',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 18
  },
  data: {
    fontFamily: 'Quicksand',
    color: 'white',
    fontSize: 14,
  }
})