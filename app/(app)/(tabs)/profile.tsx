import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/authContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCallback, useEffect } from "react";
import { Button } from "react-native-paper";

export default function ProfileScreen (){
  const { profile, getProfile, isLoading } = useSession()

  const handleGetProfile = useCallback(() => {
    if (!profile) {
      getProfile()
    }
  }, [getProfile, profile])

  useEffect(() => {
    handleGetProfile()
  }, [handleGetProfile])
  return (
    isLoading ? (
      <Loader text="Cargando perfil" />
    ) : (
      !profile ? (
        <Button onPress={handleGetProfile}>
          Inténtalo de nuevo
        </Button>
      ) : (
        <ThemedView>
          <Button>
            <FontAwesome name="user-circle" size={24} color="black" />
          </Button>
          <ThemedView>
            {/* icono */}
            <ThemedText>Hola, {profile.name.split(" ")[0]}</ThemedText>
            <ThemedView>
              <ThemedView>
                {/* icono */}
                <ThemedText>Nombre:</ThemedText>
              </ThemedView>
              <ThemedText>{profile.name}</ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedView>
                {/* icono */}
                <ThemedText>Email:</ThemedText>
              </ThemedView>
              <ThemedText>{profile.email}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

      )
    )
  )
}