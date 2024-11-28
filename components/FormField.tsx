import React from 'react'
import { View } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'
import { ThemedText } from './ThemedText'
import { FieldError } from 'react-hook-form'

interface Props extends TextInputProps {
  label: string,
  inputError?: FieldError
}

export default function FormField({ label, inputError, ...props }: Props) {
  return (
    <View>
      <TextInput
        label={label}
        error={!!inputError}
        {...props}
      />
      {inputError && (
        <ThemedText type='subtitle'>
          {inputError.message}
        </ThemedText>
      )}
    </View>

  )
}