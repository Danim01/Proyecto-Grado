import Loader from "@/components/Loader";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import { extractErrors } from "@/utils/extractErrors";
import verifyPasswordResetTokens from "@/utils/verifyPasswordResetTokens";
import { AxiosError } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

function VerifyPasswordScreen() {
  const local = useLocalSearchParams<{ token: string, uidb64: string }>()
  const router = useRouter()
  const { updateError } = useGlobalError()
  const [loaderMessage, setLoaderMessage] = useState("Validando información")
  const timeOutRef = useRef<NodeJS.Timeout | null>(null)

  const handleVerification = useCallback(async () => {
    const { token, uidb64 } = local
    if (!token || !uidb64) {
      updateError("Enlace de reinicio de contraseña invalido, por favor inténtelo de nuevo")
      router.navigate("/")
      return
    }
    try {
      const { message } = await verifyPasswordResetTokens({token, uidb64})
      setLoaderMessage(message)

      const timeOutId = setTimeout(() => {
        router.navigate(`/password/reset?token=${token}&uidb64=${uidb64}`)
      }, 5000)
      timeOutRef.current = timeOutId
    } catch (error: any) {
      updateError(error.message)
      router.navigate("/")
    }
  }, [local, updateError, router])

  useEffect(() => {
    handleVerification()

    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
    }
  }, [handleVerification])
  return (
    <ThemedView style={{ flex: 1 }}>
      <Loader text={loaderMessage}/>
    </ThemedView>
  )
}

export default VerifyPasswordScreen