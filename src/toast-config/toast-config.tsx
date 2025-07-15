import { View } from 'react-native';
import FoodCaroleSuccessToast from '~/src/components/toast/foodCaroleSuccessToast';
import CardAddedToast from '~/src/components/toast/CardAddedToast';
import { ToastProps } from 'react-native-toast-message';
import { Text, XStack } from 'tamagui';

export const toastConfig = {
  foodCaroleSuccessToast: () => <FoodCaroleSuccessToast />,
  cardAddedToast: (quantity: { props: ToastProps & { quantity: number } }) => (
    <CardAddedToast props={quantity.props} />
  ),
  minimumOrderAmountToast: () => (
    <XStack
      py={10}
      bg={'gray'}
      minHeight={40}
      maxWidth={'90%'}
      borderRadius={12}
      px="$4"
      jc="center"
      ai="center">
      <Text fontSize={14} fontWeight={700}>
        De minimale bestelwaarde voor maaltijden is €45
      </Text>
    </XStack>
  ),
};
