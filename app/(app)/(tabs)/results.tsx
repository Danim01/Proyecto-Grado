import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLookup } from '@/context/lookupContext'
import { useEffect } from 'react'
import { Image, View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { ExternalPathString, Link } from 'expo-router'

export default function ResultsScreen() {
  const { lastLookup } = useLookup()

  useEffect(() => {
    console.log(lastLookup)
  }, [lastLookup])

  let treatmentsHeader = ""

  if (lastLookup) {
    if (lastLookup.enfermedad.tratamientos.length > 1) {
      treatmentsHeader = "Tratamientos"
    } else {
      treatmentsHeader = "Tratamiento"
    }
  }


  return (
    <ScrollView>
      <ThemedView style={styles.mainContainer}>
        {
          lastLookup ? (
            <>
              <View style={styles.headerContainer}>
                <ThemedText
                  type='title'
                  style={[styles.headerTitle, styles.subtitle]}
                >
                  {lastLookup?.enfermedad.nombre}
                </ThemedText>
                <Image
                  style={styles.headerImage}
                  source={{
                    uri: lastLookup.imagen.url
                  }}
                  width={200}
                  height={200}
                />
              </View>
              <View style={styles.treatmentsContainer}>
                <ThemedText
                  type='subtitle'
                  style={styles.subtitle}
                >
                  {treatmentsHeader}
                </ThemedText>
                {
                  lastLookup.enfermedad.tratamientos.map((treatment, i) => {
                    const id = `${lastLookup.id}_${lastLookup.enfermedad.nombre}_${i} `
                    console.log(treatment)
                    return (
                      <View key={id}>
                        <ThemedText type='default'>{treatment.descripcion}</ThemedText>
                        <ThemedText type='link'>
                          <Link href={treatment.fuente as ExternalPathString}>
                            Conocer más
                          </Link>
                        </ThemedText>
                      </View>
                    )
                  })
                }
              </View>
            </>
          ) : (
            <ThemedText>Cargando</ThemedText>
          )
        }
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  headerContainer: {
    marginBottom: 32
  },
  headerTitle: {
    marginBottom: 8,

  },
  headerImage: {
    borderRadius: 6,
    elevation: 8,
    alignSelf: 'center'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
    textTransform: 'capitalize'
  },
  treatmentsContainer: {
    gap: 24
  }
})