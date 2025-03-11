import { ExpoConfig, ConfigContext } from 'expo/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Proyecto-Grado",
  slug: "Proyecto-Grado",
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY
      }
    },
    package: "com.dani56.ProyectoGrado"
  }
})