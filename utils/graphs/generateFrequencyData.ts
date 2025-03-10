import { DiseaseCount } from "@/types/statistics";

function generateFrequencyData(data: DiseaseCount) {
  //Crea un array de objetos con la información de la cantidad
  // de busquedas por enfermedad
  const labelData = Object.keys(data)
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
  /*
    data = {
      healthy: 19,
      powdery: 123,
      rust: 12,
    }

    const graphData = Object.entries(data)
    console.log(graphData)

    > [["healthy", 19], ["powdery", 123], ["rust", 12]]

    [{ illness: "healthy", count: 19 }, {...}, {...}]
  */
}

export default generateFrequencyData