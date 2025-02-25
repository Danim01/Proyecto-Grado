import { CameraPictureOptions, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'
import Feather from '@expo/vector-icons/Feather';
import { useLookup } from '@/context/lookupContext';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalError } from '@/context/globalErrorsContext';
import Loader from '@/components/Loader';


export default function AnalysisScreen() {
  const camera = useRef<CameraView>(null)
  const [permission, requestPermission] = useCameraPermissions()
  const { changeLastLookup, generateLookup, loading, loadingMessage } = useLookup()
  const router = useRouter()
  const { updateError } = useGlobalError()


  if (!permission) {
    // Cuando aun no han cargado los permisos
    return (
      <ThemedView>
        <ThemedText>Cargando permisos</ThemedText>
      </ThemedView>
    )
  }

  if (!permission.granted) {
    // Cargan los permisos pero aun no se han otorgan permisos
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message}>Necesitamos acceso a tu cámara</ThemedText>
        <Button onPress={requestPermission}>
          Otorgar permisos
        </Button>
      </ThemedView>
    );
  }

  async function takePhoto () {
    if (!camera.current) return

    const cameraOptions: CameraPictureOptions = {
      imageType: "jpg",
      quality: 0.1,
      scale: 0.8
    }

    try {
      const photo = await camera.current.takePictureAsync(cameraOptions)
      // Poner un mensaje de error cuando la foto sale mal
      if (!photo) {
        updateError("Algo salio mal, por favor tome otra foto")
        return
      }

      const newLookup = await generateLookup(photo.uri)
      if (!newLookup) return

      changeLastLookup(newLookup)
      // Verificar si búsqueda siempre retorna algo
      router.navigate("/results")
    } catch (error: any) {
      console.error(error.message)
      updateError("Algo salio mal, por favor tome otra foto")
    }
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.canceled) {
      updateError("Algo salio mal, por favor tome otra foto")
      return
    }

    const uri = result.assets[0].uri
    const newLookup = await generateLookup(uri)
    if (!newLookup) {
      updateError("Algo salio mal, por favor tome otra foto")
      return
    }

    changeLastLookup(newLookup)
    // Verificar si búsqueda siempre retorna algo
    router.navigate("/results")

  };

  return (
    // Cargan permisos y se renderiza la cámara
    <ThemedView style={styles.container}>
      {loading &&
        <Loader text={loadingMessage}/>
      }
      <CameraView style={styles.camera} ref={camera}>
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Feather name="search" size={36} color="black" />
          </TouchableOpacity>
          <Button onPress={pickImage}>
            <Feather name="image" size={24} color="white" />
          </Button>
        </ThemedView>
      </CameraView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    height: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%'
  },
  button: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -32,
    backgroundColor: 'white',
    borderRadius: 9999,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});