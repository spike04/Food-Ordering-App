import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      return Alert.alert(
        'Error',
        'Please enter valid name, email address & password.',
      )

    setIsSubmitting(true)

    try {
      // Call Appwrite Sign Up Function
      Alert.alert('Success', 'User signed up successfully.')
      router.replace('/')
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Full Name"
        value={form.name}
        placeholder="Enter your full name"
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />

      <CustomInput
        label="Email"
        value={form.email}
        placeholder="Enter your email"
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />

      <CustomInput
        label="Password"
        value={form.password}
        placeholder="Enter your password"
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry
      />

      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp
