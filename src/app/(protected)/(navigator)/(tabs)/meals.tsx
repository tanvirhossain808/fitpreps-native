import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { lazy, useEffect } from 'react';

import Subscription from '~/src/components/ProductsBynormal-sub/Subscription';
import CookdSubscriptionContainer from '~/src/components/ProductsBynormal-sub/CookdSubscriptionContainer';
import FueldProductsContainer from '~/src/components/ProductWithotuSub/FueldProductsContainer';
import NOnSubscriptionCookdProductsContainer from '~/src/components/ProductWithotuSub/NOnSubscriptionCookdProductsContainer';
import { Text, YStack } from 'tamagui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetSubCart } from '~/src/store/slices/subcartSlice';

export default function Home() {
  const { product = 'fueld', subscription = false as boolean } = useLocalSearchParams();
  // console.log(product, subscription);
  const [subscriptionType, setSubscriptionType] = useState(false);
  useFocusEffect(() => {
    setSubscriptionType(Number(subscription) === 1 ? true : false);
  });
  switch (product) {
    case 'cookd':
      return subscriptionType ? (
        <CookdSubscriptionContainer
          product={product as string}
          subscription={subscriptionType as boolean}
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
