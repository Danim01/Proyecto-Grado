import { CameraPictureOptions, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper'
import Feather from '@expo/vector-icons/Feather';
import uploadImage from '@/utils/uploadImage';

export default function AnalysisScreen() {
  const camera = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Cuando aun no han cargado los permisos
    return (
      <View>
        <Text>holi</Text>
      </View>
    )
  }

  if (!permission.granted) {
    // Cargan los permisos pero aun no se han otorgan permisos
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos acceso a tu cámara</Text>
        <Button onPress={requestPermission}>
          Otorgar permisos
        </Button>
      </View>
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
      if (!photo) return
      const imageURL = await uploadImage({ uri: photo.uri })
      console.log(imageURL)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    // Cargan permisos y se renderiza la cámara
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Feather name="search" size={36} color="black" />
          </TouchableOpacity>
          <Button>
            <Feather name="search" size={24} color="white" />
          </Button>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  },
});