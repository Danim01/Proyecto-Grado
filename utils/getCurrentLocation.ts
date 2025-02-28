import * as Location from 'expo-location';

async function getCurrentLocation() {

  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return {
      error: `
        No se pudo acceder a la ubicación, por lo que se utilizará
        una aproximada
      `
    }
  }

  let location = await Location.getCurrentPositionAsync({})
  return {
    location
  }
}

export default getCurrentLocation