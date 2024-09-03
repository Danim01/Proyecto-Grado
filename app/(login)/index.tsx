import { Link } from "expo-router";
import { useState } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import PolymorphicText from "~/components/PolymorphicText";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";



export default function LoginScreen() {
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
                <PolymorphicText variant="title">Iniciar Sesión</PolymorphicText>
                <PolymorphicText variant="subtitle">Bienvenido, por favor ingrese sus datos para iniciar sesión</PolymorphicText>
            </View>
            <View>
                <View>
                    <Label nativeID="email">Correo Electrónico</Label>
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
                    <Label nativeID="contraseña">Contraseña</Label>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value || ""}
                                secureTextEntry
                                placeholder="......."
                                aria-labelledby="contraseña"
                            />
                        )}
                        name="contraseña"
                        rules={{ required:"Este campo es requerido" }}
                    />
                </View>
                <View> 
                    <Link href="/resetpassword">
                        Recuperar contraseña
                    </Link>
                </View>
                <View>
                    <Button onPress={handleSubmit(onSubmit)}>
                        <PolymorphicText>Iniciar Sesión</PolymorphicText>
                    </Button>
                </View>
            </View>
            <View>
                <PolymorphicText>¿No estas registrado?
                    <Link href="/register">
                        Registrarse
                    </Link>
                </PolymorphicText>
            </View>
        </>
        
    )
}

const styleSheet = StyleSheet.create({
    
})