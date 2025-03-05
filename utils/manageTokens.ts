import { JWTPayload } from "@/types/common"
import { jwtDecode } from "jwt-decode"
import { Session } from "@/types/session"
import * as SecureStore from "expo-secure-store"
import { diffMilliseconds } from "@formkit/tempo"

async function uploadTokens(tokens: Session) {
  await SecureStore.setItemAsync("tokens", JSON.stringify(tokens))
}

async function getTokens(): Promise<Session | null> {
  const tokens = await SecureStore.getItemAsync("tokens")

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

function tokenExpired(token: string): boolean {
  if (!token) return true
  const decodedToken = jwtDecode<JWTPayload>(token)

  if (!decodedToken?.exp) return false

  const expInMilliseconds = decodedToken.exp * 1000

  const expDate = new Date(expInMilliseconds)
  const currentDate = new Date()
  const difference = diffMilliseconds(expDate, currentDate)

  return difference < 0
}

export {
  uploadTokens,
  getTokens,
  deleteTokens,
  tokenExpired
}