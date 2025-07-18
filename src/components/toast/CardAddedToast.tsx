import { Text, XStack } from 'tamagui';
import Toast, { ToastProps } from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
export default function CardAddedToast({ props }: { props: ToastProps & { quantity: number } }) {
  const handleToast = () => {
    setTimeout(() => router.push({ pathname: '/cart', params: { quantity: props.quantity } }), 0);

    Toast.hide();
  };
  return (
    <XStack w="100%" px="$4">
      <XStack
        gap="$2"
        bg="#009A21"
        w="100%"
        alignItems="center"
        px="$4"
        justifyContent="space-between"
        borderRadius={12}
        elevation={3}
        shadowColor="rgba(56, 58, 66, 0.25)"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={4}
        shadowOpacity={1}
        h={48}>
        <Text fontSize={16} fontWeight={700} color="white">
          {props.quantity} meal added
        </Text>
        <TouchableOpacity onPress={handleToast}>
          <XStack alignItems="center" gap="$2">
            <Text fontSize={16} fontWeight={700} color="white">
              View Cart
            </Text>
            <AntDesign name="right" size={24} color="white" />
          </XStack>
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
}
