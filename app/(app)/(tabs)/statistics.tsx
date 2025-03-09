import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useAxios from "@/hooks/useAxios";
import { Statistics } from "@/types/statistics";
import getStatistics from "@/utils/getStatistics";
import generateFrequencyData from "@/utils/graphs/generateFrequencyData";
import { useEffect, useMemo, useState } from "react";
import { CartesianChart, Bar } from "victory-native";

export default function StatisticsScreen() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const axiosClient = useAxios()

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

    console.log(statistics)
    return {
      frequencyData
    }
  }, [statistics])

  console.log(graphsData)

  return (
    <ThemedView>
      {graphsData?.frequencyData && (
        <CartesianChart
          data={graphsData.frequencyData}
          xKey="illness"
          yKeys={["count"]}
        >
          {
            ({ points, chartBounds }) => (
              <Bar
                points={points.count}
                chartBounds={chartBounds}
              />
            )
          }
        </CartesianChart>
      )}
    </ThemedView>
  )
}