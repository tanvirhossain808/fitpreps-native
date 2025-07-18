import { useLocalSearchParams } from 'expo-router';
import NOnSubscription from '~/src/components/ProducutBYCategory/NOnSubscription';
import Subscription from '~/src/components/ProducutBYCategory/Subscription';
export default function Home() {
  const { product = 'cookd', subscription = false as boolean } = useLocalSearchParams();

  return subscription ? (
    <Subscription subscription={subscription as boolean} />
  ) : (
    <NOnSubscription product={product as string} subscription={subscription as boolean} />
  );
}
