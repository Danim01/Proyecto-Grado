import { CameraPictureOptions, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper'
import { useLookup } from '@/context/lookupContext';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalError } from '@/context/globalErrorsContext';
import Loader from '@/components/Loader';


export default function AnalysisScreen() {
  const camera = useRef<CameraView>(null)
  const [isTakingPhoto, setIsTakingPhoto] = useState(false)
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
    setIsTakingPhoto(true)

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
        setIsTakingPhoto(false)
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
    } finally {
      setIsTakingPhoto(false)
    }
  }


  const pickImage = async () => {
    // Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return

    const uri = result.assets[0].uri
    const newLookup = await generateLookup(uri)
    if (!newLookup) {
      updateError("Algo salio mal, por favor tome otra foto")
      return
    }

    changeLastLookup(newLookup)
    router.navigate("/results")

  };

  return (
    // Cargan permisos y se renderiza la cámara
    <ThemedView style={styles.container}>
      {loading &&
        <Loader text={loadingMessage}/>
      }
      <CameraView style={styles.camera} ref={camera}>
        <View style={styles.controlsContainer}>
          <View style={styles.backdrop} />
          <View style={styles.buttonsContainer}>
            <IconButton
              style={styles.analysisButton}
              onPress={takePhoto}
              icon="magnify-scan"
              size={32}
              iconColor="#1b1b1b"
              disabled={isTakingPhoto}
            />
            <IconButton
              style={styles.pickImageButton}
              onPress={pickImage}
              icon="image-outline"
              iconColor="white"
            />
          </View>
        </View>
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
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  backdrop: {
    position: 'absolute',
    bottom: 0,
    height: 54,
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonsContainer: {
    position: "relative",
  },
  pickImageButton: {
    overflow: 'visible',
    marginLeft: 24,
  },
  analysisButton: {
    position: "absolute",
    left: "50%",
    width: 64,
    height: 64,
    marginLeft: -32,
    marginTop: -27,
    backgroundColor: "white",
    borderRadius: 9999,

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});