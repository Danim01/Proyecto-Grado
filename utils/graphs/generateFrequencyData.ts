import { DiseaseCount } from "@/types/statistics";

function generateFrequencyData(data: DiseaseCount) {
  //Crea un array de objetos con la información de la cantidad
  // de busquedas por enfermedad
  const graphData = Object.entries(data).map(([illness, count]) => ({
    illness,
    count
  }))

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