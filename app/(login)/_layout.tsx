import { Slot, Stack } from "expo-router";
import { View } from "react-native";


export default function LoginLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="register"/>
            <Stack.Screen name="resetpassword"/>
        </Stack>
    )
}