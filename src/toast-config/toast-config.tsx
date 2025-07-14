import { View } from 'react-native';
import FoodCaroleSuccessToast from '~/src/components/toast/foodCaroleSuccessToast';
import CardAddedToast from '~/src/components/toast/CardAddedToast';
import { ToastProps } from 'react-native-toast-message';

export const toastConfig = {
  foodCaroleSuccessToast: () => <FoodCaroleSuccessToast />,
  cardAddedToast: (quantity: { props: ToastProps & { quantity: number } }) => (
    <CardAddedToast props={quantity.props} />
  ),
};
