import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useAxios from "@/hooks/useAxios";
import { Statistics } from "@/types/statistics";
import getStatistics from "@/utils/getStatistics";
import generateFrequencyData from "@/utils/graphs/generateFrequencyData";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useWindowDimensions } from 'react-native';
import getCurrentLocation from "@/utils/getCurrentLocation";

export default function StatisticsScreen() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const axiosClient = useAxios()
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState({
    latitude: 4.811250960366896,
    longitude: -75.69131564847416
  })

  useEffect(() => {
    const getInitialLocation = async () => {
      const { location } = await getCurrentLocation()
      if (!location) return
      const coordsUser = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
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

    return {
      frequency: {
        data: frequencyData,
        segments: frequencySegments
      }
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
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})