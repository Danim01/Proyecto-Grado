import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { useGlobalError } from "@/context/globalErrorsContext";
import useAxios from "@/hooks/useAxios";
import { editProfileSchema } from "@/schema";
import editProfile from "@/utils/editProfile";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, Portal, Icon } from "react-native-paper";
import { View, StyleSheet } from 'react-native'
import { z } from "zod";

type EditProfileType = z.infer<typeof editProfileSchema>

export default function EditProfileScreen() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<EditProfileType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: ""
    }
  })
  const axiosClient = useAxios()
  const { updateError } = useGlobalError()
  const [loading, setLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const onSubmit = async (data: EditProfileType) => {
    setLoading(true)
    try {
      await editProfile({ axiosClient, name: data.name })
      reset()
      setIsFinished(true)
    } catch (error: any) {
      console.error(error.message)
      updateError("Hubo un error actualizando tus datos, por favor inténtalo de nuevo mas tarde")
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#EDF7F1', paddingHorizontal: 16, paddingVertical: 32 }}>
      {loading ? (
        <Loader text="Validando información"/>
        ) : (
          <View style={styles.container}>
            <FontAwesome name="user-circle" size={80} color="black" />
            <View style={{ width: "100%", gap: 48 }}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <FormField
                    label="Nombre"
                    placeholder="Sara"
                    onChangeText={field.onChange}
                    inputError={errors.name}
                    {...field}
                  />
                )}
              />
              <Button
                mode="contained-tonal"
                onPress={handleSubmit(onSubmit)}
                style={{ width: 200, alignSelf: "center" }}
                icon="check"
              >
                Guardar
              </Button>
            </View>
            <Link href="/profile/editPassword">
                <ThemedText type="link" style={{ fontWeight: "regular", fontFamily: "Chivo" }}>
                  Cambiar contraseña
                </ThemedText>
            </Link>
          </View>
        )
      }
      {isFinished && (
        <Portal>
          <Dialog visible={isFinished} onDismiss={() => setIsFinished(false)}>
            <Dialog.Title accessibilityLabel="Actualización exitosa">
              <Icon
                source="check-circle"
                size={32}
                color="green"
              />
            </Dialog.Title>
            <Dialog.Content>
              <ThemedText>La información se guardo exitosamente</ThemedText>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setIsFinished(false)}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 16
  }
})