import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

export type RouteType = keyof typeof headingsMap

type Props = {
  route: RouteType
  navigation?: any
}

const headingsMap = {
  history: "Historial",
  results: "Resultados",
  profile: "Perfil",
  editProfile: "Editar Perfil",
  editPassword: "Editar Contraseña",
  statistics: "Estadísticas"
}

function Header({ route, navigation }: Props) {
  const heading = headingsMap[route]

  return (
    <View style={styles.container}>
        {
          navigation && (
            <IconButton
              icon="arrow-left"
              iconColor='#1b1b1b'
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            />
          )
        }
        <Text style={styles.heading}>{heading}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  heading: {
    fontFamily: 'Chivo',
    fontSize: 24,
    fontWeight: 'semibold'
  },
  goBackButton: {
    position: 'absolute',
    left: 0
  }
})