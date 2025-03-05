import { Asset } from 'expo-asset'
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'

async function optimizeImage(uri: string) {
  const errorMessage = "Error optimizando la imagen, por favor inténtalo de nuevo."
  try {
    // Asset sirve para acceder al archivo(imagen)
    // .fromURI sirve para generar objeto de tipo asset que tiene
    // propiedades para acceder al archivo pero no es el archivo como tal
    const file = Asset.fromURI(uri)
    // downloadAsync crea una nueva uri a partir de acceder a la imagen con
    // la uri que se tenia en el objeto de tipo asset, la cual si permite
    // que trabajemos con la imagen
    await file.downloadAsync()

    if (!file.localUri) {
      console.error("Error obteniendo el archivo")
      throw new Error(errorMessage)
    }
    // Se genera un manipulador para aplicar las transformaciones a la imagen
    // pasándole la ubicación de la imagen
    const manipulator = ImageManipulator.manipulate(file.localUri)
    // El manipulador permite poner las funciones que aplican las transformaciones una a una
    const imageRef = await manipulator
    // Resize cambia el tamaño de la imagen
      .resize({ width: 500 })
    // RenderAsync permite aplicar las transformaciones que se hacen en las otras funciones
      .renderAsync()

    // saveAsync permite almacenar la imagen en la cache y recibe un objeto de configuración
    // como argumento
    const imageFile = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: 0.7
    })

    if (!imageFile.uri) {
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