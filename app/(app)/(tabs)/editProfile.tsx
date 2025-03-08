import FormField from "@/components/FormField";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import useAxios from "@/hooks/useAxios";
import { editProfileSchema } from "@/schema";
import editProfile from "@/utils/editProfile";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Icon } from "react-native-paper";
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
      const response = await editProfile({ axiosClient, name: data.name })
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
    <ThemedView>
      {loading &&
        <Loader text="Validando información"/>
      }
      {isFinished &&
        <>
          <Icon
            source="check-circle"
            size={20}
            color="green"
          />
          <ThemedText type="defaultSemiBold">La información se guardo exitosamente</ThemedText>
        </>

      }
      <FontAwesome name="user-circle" size={80} color="black" />
      <ThemedView>
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
      </ThemedView>
      <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
      <Link href="/editPassword">
          <ThemedText type="link">
            Cambiar contraseña
          </ThemedText>
      </Link>
    </ThemedView>
  )
}