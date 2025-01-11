import { Session } from "@/types/session";
import * as SecureStore from "expo-secure-store"
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens";

async function uploadTokens(tokens: Session) {
  await SecureStore.setItemAsync("tokens", JSON.stringify(tokens))
}

function getTokens(): Session | null {
  const tokens = SecureStore.getItem("tokens")

  if (!tokens) return null
  
  return JSON.parse(tokens) as Session
}

async function deleteTokens() {
  try {
    await SecureStore.deleteItemAsync("tokens")
  } catch (error: any) {
    console.error(error.message)
  }
}

export {
  uploadTokens,
  getTokens,
  deleteTokens
}