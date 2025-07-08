import { Text, XStack } from 'tamagui';
import Check from 'public/images/check-circle-broken.svg';
export default function FoodCaroleSuccessToast() {
  return (
    <XStack w="100%" px="$4">
      <XStack
        gap="$2"
        bg="#E5F8EA"
        w="100%"
        alignItems="center"
        justifyContent="center"
        borderRadius={12}
        elevation={3}
        shadowColor="rgba(56, 58, 66, 0.25)"
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={4}
        shadowOpacity={1}
        h={48}>
        <Text fontSize={16} fontWeight={700} color="#009A21">
          Food Calories Added
        </Text>
        <Check />
      </XStack>
    </XStack>
  );
}
