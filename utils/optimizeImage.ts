import { Asset } from 'expo-asset'
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'

async function optimizeImage(uri: string) {
  const errorMessage = "Error optimizando la imagen, por favor inténtalo de nuevo."
  try {
    
    const file = Asset.fromURI(uri)
    await file.downloadAsync()

    if (!file.localUri) {
      console.error("Error obteniendo el archivo")
      throw new Error(errorMessage)
    }

    const manipulator = ImageManipulator.manipulate(file.localUri)
    const imageRef = await manipulator
      .resize({ width: 500 })
      .renderAsync()

    const imageFile = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: 0.7
    })

    if (!imageFile) {
      console.error("Error en saveAsync")
      throw new Error(errorMessage)
    }

    return imageFile.uri
  } catch (error: any) {
    console.error(error.message)
    throw new Error(errorMessage)
  }
}

export default optimizeImage