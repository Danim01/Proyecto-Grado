import FormField from "@/components/FormField";
import { ThemedView } from "@/components/ThemedView";
import { editProfileSchema } from "@/schema";
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

  const onSubmit = (data: any) => {
    try {
      
    } catch (error) {
      
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
              inputError={errors.password}
              {...field}
            />
          )}
        />
      </ThemedView>
      <Button onPress={handleSubmit(onsubmit)}>Guardar</Button>
      <Button>Cambiar Contraseña</Button>
    </ThemedView>
  )
}