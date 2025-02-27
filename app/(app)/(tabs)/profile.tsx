import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/authContext";
import { useGlobalError } from "@/context/globalErrorsContext";
import useAxios from "@/hooks/useAxios";
import { Profile } from "@/types/common";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCallback, useEffect, useState } from "react";
import { Button, Divider, IconButton } from "react-native-paper";
import getProfileAction from "@/utils/getProfile"
import { StyleSheet } from "react-native";
import CardUser from "@/components/CardUser";
import capitalize from "@/utils/capitalize";

export default function ProfileScreen (){
  const [isLoading, setIsLoading] = useState(false)
  const { session } = useSession()
  const [profile, setProfile] = useState<Profile | null>(null)
  const axiosClient = useAxios()
  const { updateError } = useGlobalError();

  const getProfile = useCallback(async () => {
    if (!session) return
    console.log(session)
    setIsLoading(true)
    try {
      const newProfile = await getProfileAction(axiosClient)
      setProfile(newProfile)
    } catch (error: any) {
      updateError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [axiosClient, updateError, session])

  const handleGetProfile = useCallback(async () => {
    if (!profile) {
      await getProfile()
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
        <ThemedView style={styles.mainContainer}>
          <ThemedView style={styles.header}>
            <IconButton
              icon="pencil"
              style={styles.editButton}
              accessibilityLabel="Editar perfil"
            >
              {/* <EvilIcons  name="pencil" size={24} color="black" style={styles.editIcon} /> */}
            </IconButton>
          </ThemedView>
          <ThemedView style={styles.container}>
            <ThemedView style={styles.containerIconUser}>
              <FontAwesome name="user-circle" size={80} color="black" />
              <ThemedText type="subtitle">Hola, {capitalize(profile.name.split(" ")[0])}</ThemedText>
            </ThemedView>
            <Divider bold />
            <CardUser
              label="Nombre"
              value={capitalize(profile.name)}
              icon="account"
            />
            <Divider bold />
            <CardUser
              label="Email"
              value={profile.email}
              icon="email-outline"
            />
          </ThemedView>
        </ThemedView>

      )
    )
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  header: {
    alignItems: "flex-end"
  },
  editButton: {
    width: 50,
    padding: 0,
  },
  container: {
    gap: 30
  },
  containerIconUser: {
    display: "flex",
    alignItems: "center",
    gap: 20
  },
})