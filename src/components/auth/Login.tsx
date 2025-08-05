import { View, Text, YStack, XStack, Button, Input } from 'tamagui';
import Fitpreps from 'public/images/logo/fitpreps.svg';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useLoginMutation } from '~/src/store/apiSlices/auth/userSlice';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '~/src/store/auth/userSlice';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userLogin, { isLoading, error, data }] = useLoginMutation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const handleLogin = () => {
    userLogin({
      email,
      password,
    })
      .unwrap()
      .then((data) => {
        Toast.show({
          type: 'success',
          text1: data.message,
          // text2: 'You have successfully logged in',
        });
        dispatch(setUser(data));
        router.replace('/(tabs)');
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.data.message,
          text2: 'Please try again',
        });
      });
  };
  return (
    <YStack mt={180} gap={28} alignItems="center" px="$7" pb={50}>
      <XStack flex={1} alignItems="center" justifyContent="center">
        <Fitpreps />
      </XStack>
      <Text fontSize={16} fontWeight={500} color="#1E1F20" textAlign="center">
        Welcome Back!
      </Text>
      <YStack flex={1} width="100%" gap="$4">
        {loginFeilds.map((field, i) => (
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
                shadowRadius={1}
                shadowOpacity={0.4}
                elevation={0.4}
                shadowColor="rgba(221, 223, 227, 0.1)"
                borderWidth={0.6}>
                <Input
                  onChangeText={setEmail}
                  value={email}
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
                shadowOpacity={0.4}
                elevation={0.4}
                shadowColor="rgba(221, 223, 227, 0.1)"
                borderWidth={0.6}>
                <Input
                  p={0}
                  flex={1}
                  placeholder={field.placeholder}
                  color="#8E95A2"
                  fontSize={14}
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!showPassword}
                  keyboardType={field.type === 'email-address' ? 'email-address' : 'default'}
                  borderWidth={0}
                  borderColor="transparent"
                  unstyled
                />
                {typeof field.icon === 'function' && (
                  <TouchableOpacity onPress={() => setShowPassword((pass) => !pass)}>
                    {field.icon({
                      name: !showPassword ? 'eye-off' : 'eye',
                      size: 24,
                      color: '#8E95A2',
                    })}
                  </TouchableOpacity>
                )}
              </XStack>
            )}
          </YStack>
        ))}
        <XStack alignItems="center" justifyContent="flex-end">
          <TouchableOpacity onPress={() => router.replace('/(auth)/forget-pass')}>
            <Text
              fontSize={16}
              fontWeight={700}
              borderBottomWidth={1}
              borderBottomColor="#FD4F01"
              color="#FD4F01">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
      <XStack justifyContent="center">
        <Button
          // onPress={() => router.replace('/(tabs)')}
          onPress={handleLogin}
          minWidth={0}
          px="$5"
          backgroundColor="#FD4F01"
          color="white"
          fontWeight="700"
          borderRadius={8}
          shadowColor="rgba(186, 192, 202, 0.05)"
          shadowOffset={{ width: 0, height: 1 }}
          shadowRadius={2}
          shadowOpacity={1}
          elevation={1}
          height={44}
          fontSize={16}>
          Log In
        </Button>
      </XStack>
      <XStack alignItems="center" justifyContent="center" gap={12}>
        <Text fontSize={16} color="#1E1F20" fontWeight={500} textAlign="center">
          Don&apos;t have an account?
        </Text>
        <XStack alignItems="center" justifyContent="flex-end">
          <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}>
            <Text
              fontSize={16}
              fontWeight={700}
              borderBottomWidth={1}
              borderBottomColor="#FD4F01"
              color="#FD4F01">
              Create Account
            </Text>
          </TouchableOpacity>
        </XStack>
      </XStack>
    </YStack>
  );
}

const loginFeilds = [
  {
    placeholder: 'Enter your email id',
    type: 'email-address',
    icon: '',
    name: 'email',
  },
  {
    placeholder: 'Enter password',
    icon: ({ ...props }) => <Feather {...props} />,
    type: 'password',
    name: 'password',
  },
];
