import { ThemedText } from "@/components/ThemedText";
import useAxios from "@/hooks/useAxios";
import { Statistics } from "@/types/statistics";
import getStatistics from "@/utils/getStatistics";
import generateFrequencyData from "@/utils/graphs/generateFrequencyData";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useWindowDimensions } from 'react-native';
import getCurrentLocation from "@/utils/getCurrentLocation";
import MapView, { Marker } from "react-native-maps";
import camelCase from "just-camel-case";
import Loader from "@/components/Loader";

const markersMapping: Record<string, any> = {
  saludable: require('@/assets/images/marker-saludable.png'),
  roya: require('@/assets/images/marker-roya.png'),
  mildiuPolvoriento: require('@/assets/images/marker-mildiu_polvoriento.png')
}

const mapLegend = [
  {illness: "Saludable", color: "#228B22", id: "a2b1f8e6-e69b-4eb6-8cea-f67d07f68918"},
  {illness: "Roya", color: "#FD7E14", id: "865e0c8e-9ee9-45f2-8da3-93143d73a504"},
  {illness: "Mildiu Polvoriento", color: "#708090", id: "d08d6b22-52f7-4725-a583-8a0f121f93f6"},
]

export default function StatisticsScreen() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const axiosClient = useAxios()
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState({
    latitude: 4.811250960366896,
    longitude: -75.69131564847416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  useEffect(() => {
    const getInitialLocation = async () => {
      const { location } = await getCurrentLocation()
      if (!location) return
      const coordsUser = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      setLocation(coordsUser)
    }

    getInitialLocation()
  }, [])

  useEffect(() => {
    const getInitialStatistics = async () => {
      const newStatistics = await getStatistics(axiosClient)
      setStatistics(newStatistics)
    }

    getInitialStatistics()
  }, [])

  const graphsData = useMemo(() => {
    if (!statistics) return null

    const { conteo_enfermedades } = statistics

    const frequencyData = generateFrequencyData(conteo_enfermedades)
    const maxFrequency = Math.max(...frequencyData.datasets[0].data);

    const frequencySegments = maxFrequency;
    const markers = statistics.frecuencia_por_ubicacion
    const maxLookup = statistics.frecuencia_por_fecha

    return {
      frequency: {
        data: frequencyData,
        segments: frequencySegments
      },
      markers,
      maxLookup
    }
  }, [statistics])

  return (
    <ScrollView style={styles.container}>
      <View style={{height: 250, backgroundColor: "white", borderTopLeftRadius: 16, borderTopRightRadius: 16, justifyContent: "space-between", paddingTop: 8, marginBottom: 16 }}>
        {graphsData?.frequency.data ? (
          <>
            <ThemedText
              type="subtitle"
              style={{
                fontWeight: "500",
                textAlign: 'center'
              }}
              >
                Frecuencia de enfermedades
              </ThemedText>
            <BarChart
              data={graphsData.frequency.data}
              // Ancho de pantalla - (padding * 2)
              // Esto se hace porque si solo se le aplica el width le quita el
              // padding de un solo lado y si lo multiplicamos por 2 le va a quitar el
              // padding a ambos lados
              width={width - (16 * 2)}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero={true}
              segments={graphsData.frequency.segments}
              chartConfig={{
                backgroundGradientFrom: "#234F30",
                backgroundGradientTo: "#234F30",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 8,
                },
              }}
            />
          </>
        ) : (
          <Loader text="Cargando..." />
        )}
      </View>
      {
        graphsData?.maxLookup && (
          <View style={{ marginBottom: 16, padding: 16, backgroundColor: "white", borderRadius: 16  }}>
            <ThemedText
              type="subtitle"
              style={{
                fontWeight: "500",
                textAlign: 'center'
              }}
            >
              Tu resultado más común es:
            </ThemedText>
            <ThemedText style={{ textAlign: 'center', textTransform: 'capitalize' }}>{graphsData.maxLookup.enfermedad}</ThemedText>
          </View>
        )
      }
      <View style={styles.mapContainer}>
        <ThemedText
          type="subtitle"
          style={{
            fontWeight: "500",
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Enfermedad más común por región
        </ThemedText>
        <MapView
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta
          }}
          style={styles.map}
        >
          {
            graphsData?.markers && (
              graphsData.markers.map((marker, i) => {
                const camelizedName = camelCase(marker.enfermedad);
                const markerImage = markersMapping[camelizedName];

                return (
                  <Marker
                    key={`${marker.ubicacion}_${marker.enfermedad}_${i}`}
                    coordinate={{
                      latitude: marker.latitud,
                      longitude: marker.longitud,
                    }}
                    title={marker.enfermedad}
                    anchor={{
                      x: 0.5,
                      y: 1,
                    }}
                  >
                    <Image
                      source={markerImage}
                      style={{ width: 26, height: 28 }}
                      resizeMode="contain"
                    />
                  </Marker>
              )})
            )
          }
        </MapView>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingVertical: 16, paddingHorizontal: 8 }}>
          {mapLegend.map(({illness, color, id}) => (
            <View key={id} style={{ alignItems: "center", flex: 1}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  borderRadius: 9999
                }}
              />
              <ThemedText style={{ fontSize: 13, textAlign: "center" }}>{illness}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF7F1',
    padding: 16,
    gap: 16,
  },
  mapContainer: {
    flex: 1,
    marginBottom: 32,
    paddingTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "white"
  },
  map: {
    width: '100%',
    height: 300,
  }
})