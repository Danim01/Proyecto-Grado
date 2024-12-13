import { BlobServiceClient } from '@azure/storage-blob'
import uuid from 'react-native-uuid'
import getSasURL from './getSasURL'

interface Params {
  uri: string
}

// Hace referencia a la carpeta que esta subida en azure para guardar la imagen
const containerName = "."

async function uploadImage({ uri }: Params) {
  try {
    const tokenSas = await getSasURL()

    if (!tokenSas) return null

    // Obtiene la imagen que esta guardada en la cache del dispositivo
    // La cache es una memoria temporal
    const response = await fetch(uri)

    // Convierte la imagen en un Blob ya que Azure solo recibe archivos convertidos en binario
    const file = await response.blob()
    // Se crea el identificador unido de la imagen
    const fileId = uuid.v4()
    const fileFormat = 'jpg'
    const fileName = `${fileId}.${fileFormat}`

    // Llave para acceder al archivo donde se va a guardar la imagen
    const blobServiceClient = new BlobServiceClient(tokenSas)
    // Almacena la carpeta donde se va a subir la imagen
    const containerClient = blobServiceClient.getContainerClient(containerName)
    // Genera un archivo en la carpeta donde se va a subir la imagen
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    // Sube la imagen a la carpeta en el archivo que le genero
    await blockBlobClient.uploadData(file)

    // URL donde esta almacenada la imagen en Azure
    const blobFileURL = blockBlobClient.url

    // Creamos una nueva URL con el objeto URL de js
    const imageURLObj = new URL(blobFileURL)
    // Eliminamos los parámetros que contiene la URL que envía Azure porque no
    // se puede acceder a la imagen con ellos
    imageURLObj.search = ""
    // Convertimos el objeto de la URL en un string
    const imageURLPurged = imageURLObj.toString()

    return imageURLPurged
  } catch (error) {
    console.error(error)
    return null
  }  
}

export default uploadImage