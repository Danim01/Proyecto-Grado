import FormField from "@/components/FormField";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalError } from "@/context/globalErrorsContext";
import useAxios from "@/hooks/useAxios";
import { editProfileSchema } from "@/schema";
import editProfile from "@/utils/editProfile";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { z } from "zod";

export default function EditProfileScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      password: ""
    }
  })
  const axiosClient = useAxios()
  const { updateError } = useGlobalError()

  const onSubmit = async (data: any) => {
    try {
      const response = await editProfile({ axiosClient, email: data })
    } catch (error: any) {
      console.error(error.message)
      updateError("ho")
    }
  }
  return (
    <ThemedView>
      <FontAwesome name="user-circle" size={80} color="black" />
      <ThemedView>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FormField
              label="Nombre"
              onChangeText={field.onChange}
              inputError={errors.name}
              {...field}
            />
          )}
        />
      </ThemedView>
      <Button onPress={handleSubmit(onSubmit)}>Guardar</Button>
      <Button>Cambiar Contraseña</Button>
    </ThemedView>
  )
}