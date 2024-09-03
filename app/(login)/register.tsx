import { Link } from "expo-router";
import { useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import PolymorphicText from "~/components/PolymorphicText";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function RegisterScreen() {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    
    const onError: SubmitErrorHandler<any> = (errors, e) => {
        return console.log(errors)
    }


    return (
        <>
            <View>
                <PolymorphicText variant="title">Registrarse</PolymorphicText>
                <PolymorphicText variant="subtitle">Ingresa tus datos para completar tu registro</PolymorphicText>
            </View>
            <View>
                <View>
                    <Label nativeID="name">Nombre</Label>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value || ""}
                                placeholder="kevinPapasito"
                            />
                        )}
                        name="name"
                        rules={{ required:"Este campo es requerido" }}
                    />
                </View>
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
                    <Label nativeID="password">Contraseña</Label>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value || ""}
                                secureTextEntry
                                placeholder="..........."
                                aria-labelledby="contraseña"
                            />
                        )}
                        name="password"
                        rules={{ required:"Este campo es requerido" }}
                    />
                </View>
                <View>
                    <Label nativeID="confirmPassword">Confirmar Contraseña</Label>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value || ""}
                                secureTextEntry
                                placeholder="..........."
                                aria-labelledby="contraseña"
                            />
                        )}
                        name="confirmPassword"
                        rules={{ required:"Este campo es requerido" }}
                    />
                </View>
                <View>
                    <Button onPress={handleSubmit(onSubmit)}>
                        <PolymorphicText>Registrar</PolymorphicText>
                    </Button>
                </View>            
            </View>
            <View>
                <PolymorphicText>¿Ya tienes una cuenta? 
                    <Link href="/">
                        Iniciar Sesión
                    </Link>
                </PolymorphicText>
            </View>
        </>
    )
}