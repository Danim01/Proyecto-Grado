import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useAxios from "@/hooks/useAxios";
import { Statistics } from "@/types/statistics";
import getStatistics from "@/utils/getStatistics";
import generateFrequencyData from "@/utils/graphs/generateFrequencyData";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useWindowDimensions } from 'react-native';
import getCurrentLocation from "@/utils/getCurrentLocation";
import MapView, { Marker } from "react-native-maps";
import camelCase from "just-camel-case";

const markersMapping: Record<string, any> = {
  saludable: require('@/assets/images/marker-saludable.png'),
  roya: require('@/assets/images/marker-roya.png'),
  mildiuPolvoriento: require('@/assets/images/marker-mildiu_polvoriento.png')
}

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
    <ThemedView style={styles.container}>
      <View style={{height: 250, }}>
        {graphsData?.frequency.data ? (
          <>
            <ThemedText>Frecuencia de enfermedades</ThemedText>
            <BarChart
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              data={graphsData.frequency.data}
              width={width}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero={true}
              segments={graphsData.frequency.segments}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
              }}
            />
          </>
        ) : (
          <ThemedText>holi</ThemedText>
        )}
      </View>
      <View style={styles.mapContainer}>
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
      </View>
      <View>
        {
          graphsData?.maxLookup && (
            <>
              <ThemedText>La enfermedad que más registras es:</ThemedText>
              <ThemedText>{graphsData.maxLookup.enfermedad}</ThemedText>
            </>
          )
        }
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%'
  }
})