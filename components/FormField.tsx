import React, { ElementRef, forwardRef } from 'react'
import { View, TextInput as RNTextInput } from 'react-native'
import { TextInput, TextInputProps  } from 'react-native-paper'
import { ThemedText } from './ThemedText'
import { FieldError } from 'react-hook-form'

interface Props extends TextInputProps {
  label: string,
  inputError?: FieldError
}

const FormField = forwardRef<RNTextInput, Props>(({
  label, inputError, ...props
}, ref) => {
  return (
    <View>
      <TextInput
        ref={ref}
        label={label}
        error={!!inputError}
        {...props}
      />
      {inputError && (
        <ThemedText type='errorForm'>
          {inputError.message}
        </ThemedText>
      )}
    </View>
  )
})

export default FormField