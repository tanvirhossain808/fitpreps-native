import { useLocalSearchParams } from 'expo-router';
import { lazy } from 'react';

import Subscription from '~/src/components/ProductsBynormal-sub/Subscription';
import CookdSubscriptionContainer from '~/src/components/ProductsBynormal-sub/CookdSubscriptionContainer';
import FueldProductsContainer from '~/src/components/ProductWithotuSub/FueldProductsContainer';
import NOnSubscriptionCookdProductsContainer from '~/src/components/ProductWithotuSub/NOnSubscriptionCookdProductsContainer';
import { Text, YStack } from 'tamagui';

export default function Home() {
  const { product = 'cookd', subscription = false as boolean } = useLocalSearchParams();
  const subscriptionType = Number(subscription) === 1 ? true : false;
  switch (product) {
    case 'cookd':
      return !subscriptionType ? (
        <CookdSubscriptionContainer
          product={product as string}
          subscription={!subscriptionType as boolean}
        />
      ) : (
        <NOnSubscriptionCookdProductsContainer
          product={product as string}
          subscription={subscriptionType as boolean}
        />
      );
    case 'fueld':
      return subscriptionType ? (
        <Subscription product={product as string} subscription={subscription as boolean} />
      ) : (
        // <NOnSubscription product={product as string} subscription={subscription as boolean} />
        <FueldProductsContainer
          product={product as string}
          subscription={subscriptionType as boolean}
        />
      );
    case 'suppd':
      return subscriptionType ? (
        <Subscription product={product as string} subscription={subscriptionType as boolean} />
      ) : (
        <YStack>
          <Text>Subscription coming soon</Text>
        </YStack>
      );
    default:
      return subscriptionType ? (
        <Subscription product={product as string} subscription={subscription as boolean} />
      ) : (
        <NOnSubscriptionCookdProductsContainer
          product={product as string}
          subscription={subscription as boolean}
        />
      );
  }
}
