import React, { forwardRef, useState } from 'react'
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native'
import { IconButton, TextInput, TextInputProps  } from 'react-native-paper'
import { ThemedText } from './ThemedText'
import { FieldError } from 'react-hook-form'

interface Props extends TextInputProps {
  label: string
  inputError?: FieldError
  isPassword?: boolean
}

const FormField = forwardRef<RNTextInput, Props>(({
  label, inputError, isPassword, ...props
}, ref) => {
  const [showValue, setShowValue] = useState(!isPassword)

  const handleShowValue = () => {
    setShowValue(!showValue)
  }
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          ref={ref}
          label={label}
          error={!!inputError}
          secureTextEntry={!showValue}
          {...props}
        />
        {
          isPassword && (
            <IconButton
              icon="eye"
              onPress={handleShowValue}
              style={styles.showValueButton}
            />
          )
        }
      </View>
      {inputError && (
        <ThemedText type='errorForm'>
          {inputError.message}
        </ThemedText>
      )}
    </View>
  )
})

FormField.displayName = "FormField"

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  showValueButton: {
    position: "absolute",
    right: 0,
    transform: [{ translateY: -2 }],
    height: 50
  }
})

export default FormField