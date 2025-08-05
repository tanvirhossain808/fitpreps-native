import { Text, XStack, YStack, Input, Button } from 'tamagui';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Fitpreps from 'public/images/logo/fitpreps.svg';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useRegisterMutation } from '~/src/store/apiSlices/auth/userSlice';
import { FormDataType, RegisterBody } from '~/src/types/type';
import Toast from 'react-native-toast-message';

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [registerMutation, { isLoading, error, data }] = useRegisterMutation();
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
    first_name: '',
    confirm_password: '',
    last_name: '',
  });
  const handleRegister = () => {
    if (formData.password !== formData.confirm_password) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }
    registerMutation({
      email: formData.email,
      password: formData.password,
      metadata: {
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
    })
      .unwrap()
      .then((data) => {
        // console.log(data, 'data');
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        router.replace('/(tabs)');
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: error.data.message,
          text2: 'Please try again',
        });
      });
  };
  console.log(formData);
  return (
    <YStack mt={180} gap={28} alignItems="center" px="$7" pb={50}>
      <XStack flex={1} alignItems="center" justifyContent="center">
        <Fitpreps />
      </XStack>
      <Text fontSize={16} fontWeight={500} color="#1E1F20" textAlign="center">
        Sign up to start your journey with us.
      </Text>
      <YStack flex={1} width="100%" gap="$4">
        {creaetAccoungFeilds.map((field, i) => (
          <YStack key={i}>
            {!field.icon ? (
              <XStack
                alignItems="center"
                gap={8}
                flex={1}
                w={'100%'}
                px={14}
                h="45"
                borderRadius={8}
                borderColor="#EDEEF1"
                backgroundColor="white"
                shadowOffset={{ width: 0, height: 1 }}
                shadowRadius={2}
                shadowOpacity={1}
                elevation={0.4}
                shadowColor="rgba(221, 223, 227, 0.1)"
                borderWidth={0.6}>
                <Input
                  value={formData[field.inputType as keyof FormDataType]}
                  onChangeText={(text) =>
                    setFormData({ ...formData, [field.inputType as keyof FormDataType]: text })
                  }
                  flex={0}
                  p={0}
                  width="100%"
                  placeholder={field.placeholder}
                  bg="white"
                  color="#8E95A2"
                  fontSize={14}
                  keyboardType={field.type === 'email-address' ? 'email-address' : 'default'}
                  borderWidth={0}
                  borderColor="transparent"
                  borderRadius={8}
                />
              </XStack>
            ) : (
              <XStack
                alignItems="center"
                gap={8}
                flex={1}
                w={'100%'}
                h="45"
                px={14}
                borderRadius={8}
                borderColor="#EDEEF1"
                backgroundColor="white"
                shadowOffset={{ width: 0, height: 1 }}
                shadowRadius={2}
                shadowOpacity={1}
                elevation={0.4}
                shadowColor="rgba(221, 223, 227, 0.1)"
                borderWidth={0.6}>
                <Input
                  p={0}
                  flex={1}
                  placeholder={field.placeholder}
                  color="#8E95A2"
                  fontSize={14}
                  value={formData[field.inputType as keyof FormDataType]}
                  onChangeText={(text) =>
                    setFormData({ ...formData, [field.inputType as keyof FormDataType]: text })
                  }
                  secureTextEntry={!showPassword[field.name as keyof typeof showPassword]}
                  keyboardType={field.type === 'email-address' ? 'email-address' : 'default'}
                  borderWidth={0}
                  borderColor="transparent"
                  unstyled
                />
                {typeof field.icon === 'function' && (
                  <TouchableOpacity
                    onPress={() =>
                      setShowPassword({
                        ...showPassword,
                        [field.name as keyof typeof showPassword]:
                          !showPassword[field.name as keyof typeof showPassword],
                      })
                    }>
                    {field.icon({
                      name: !showPassword[field.name as keyof typeof showPassword]
                        ? 'eye-off'
                        : 'eye',
                      size: 24,
                      color: '#8E95A2',
                    })}
                  </TouchableOpacity>
                )}
              </XStack>
            )}
          </YStack>
        ))}
      </YStack>
      <YStack>
        <Text fontSize={12} color="#1E1F20" fontWeight={500} textAlign="center">
          By continuing, you agree to
        </Text>
        <XStack alignItems="center" gap={4}>
          <TouchableOpacity>
            <Text color="#FD4F01" fontWeight={500}>
              Terms of Use
            </Text>
          </TouchableOpacity>
          <Text>and</Text>
          <TouchableOpacity>
            <Text color="#FD4F01" fontWeight={500}>
              Privacy Policy.
            </Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
      <XStack justifyContent="center">
        <Button
          // onPress={() => router.replace('/(tabs)')}
          onPress={handleRegister}
          minWidth={0}
          px="$5"
          backgroundColor="#FD4F01"
          color="white"
          fontWeight="700"
          borderRadius={8}
          shadowColor="rgba(210, 214, 222, 0.05)"
          shadowOffset={{ width: 0, height: 1 }}
          shadowRadius={2}
          shadowOpacity={1}
          elevation={1}
          height={44}
          fontSize={16}>
          Create Account
        </Button>
      </XStack>
      <XStack alignItems="center" justifyContent="center" gap={12}>
        <Text fontSize={16} color="#1E1F20" fontWeight={500} textAlign="center">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/log-in')}>
          <XStack>
            <Text fontSize={16} fontWeight={700} color="#FD4F01" textDecorationLine="underline">
              Lo
            </Text>
            <Text fontSize={16} color="#FD4F01" fontWeight={700}>
              g
            </Text>
            <Text
              ml={2}
              fontSize={16}
              color="#FD4F01"
              fontWeight={700}
              textDecorationLine="underline">
              In
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}

const creaetAccoungFeilds = [
  {
    placeholder: 'Enter First Name',
    icon: '',
    type: 'default',
    name: 'firstName',
    inputType: 'first_name',
  },
  {
    placeholder: 'Enter Last Name',
    icon: '',
    type: 'default',
    name: 'lastName',
    inputType: 'last_name',
  },
  {
    placeholder: 'Enter email',
    type: 'email-address',
    icon: '',
    name: 'email',
    inputType: 'email',
  },
  {
    placeholder: 'Enter password',
    icon: ({ ...props }) => <Feather {...props} />,
    type: 'password',
    name: 'password',
    inputType: 'password',
  },
  {
    placeholder: 'Confirm password',
    icon: ({ ...props }) => <Feather {...props} />,
    type: 'password',
    name: 'confirmPassword',
    inputType: 'confirm_password',
  },
];
