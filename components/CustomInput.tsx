import { CustomInputProps } from '@/types'
import cn from 'clsx'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

const CustomInput = ({
  placeholder = 'Enter Text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'default',
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#888888"
        className={cn(
          'input',
          isFocused ? 'border-primary' : 'border-gray-300',
        )}
      />
    </View>
  )
}

export default CustomInput
