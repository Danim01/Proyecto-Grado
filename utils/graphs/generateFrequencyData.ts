import { DiseaseCount } from "@/types/statistics";
import capitalize from "just-capitalize"

function generateFrequencyData(data: DiseaseCount) {
  const labelData = Object.keys(data).map((label) => capitalize(label))
  const valueData = Object.values(data).map(Number)

  const graphData = {
    labels: labelData,
    datasets: [
      {
        data: valueData
      }
    ]
  }

  return graphData
}

export default generateFrequencyData