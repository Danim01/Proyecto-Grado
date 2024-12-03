import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper'
import Feather from '@expo/vector-icons/Feather';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AnalysisScreen() {
  const camera = useRef(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    console.log("AQUÍ", camera.current)
  }, [camera.current])

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View>
        <Text>holi</Text>
      </View>
    )
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          grant permission
        </Button>
      </View>
    );
  }
  

  // async function takePhoto () {
  //   const photo = await takePicture
  // }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Feather name="search" size={24} color="black" />
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
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%'
  },
  button: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' }
    ],
    backgroundColor: 'white',
    borderRadius: '9999px',
    padding: 8,
    aspectRatio: '1/1',
    overflow: 'visible',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});