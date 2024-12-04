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

    const response = await fetch(uri)

    const file = await response.blob()
    const fileId = uuid.v4()
    const fileFormat = 'jpg'
    const fileName = `${fileId}.${fileFormat}`

    const blobServiceClient = new BlobServiceClient(tokenSas)
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(fileName)
    await blockBlobClient.uploadData(file)

    const blobFileURL = blockBlobClient.url

    const imageURLObj = new URL(blobFileURL)
    imageURLObj.search = ""
    const imageURLPurged = imageURLObj.toString()

    return imageURLPurged
  } catch (error) {
    console.error(error)
    return null
  }  
}

export default uploadImage