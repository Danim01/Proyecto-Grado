import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import PolymorphicText from "~/components/PolymorphicText";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function() {
    const { control, handleSubmit, formState: { errors } } = useForm()
    const [formData, setFormData] = useState(null)

    const onSubmit = (data: any) => {
        console.log('Submitted Data:', data);
        setFormData(data);
    };

    return (
        <>
            <View>
                <View>
                    <Label nativeID="email">Correo</Label>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value || ""}
                                placeholder="kevinPapasito@gmail.com"
                                aria-labelledby="email"
                            />
                        )}
                        name="email"
                        rules={{ required:"Este campo es requerido" }}
                    />
                </View>
                <View>
                    <Button onPress={handleSubmit(onSubmit)}>
                        <PolymorphicText>Recuperar Contraseña</PolymorphicText>
                    </Button>
                </View>
            </View>
        </>
    )
}