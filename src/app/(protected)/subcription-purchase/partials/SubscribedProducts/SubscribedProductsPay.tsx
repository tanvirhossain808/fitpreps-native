import React, { useEffect, useState } from 'react';
import { Button, Text, View, XStack, YStack, Spinner } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import Coin from 'public/images/coin.svg';
import { DateData } from 'react-native-calendars';
import { router } from 'expo-router';
import { resetSubCart } from '~/src/store/slices/subcartSlice';
import { baseUrl } from '~/src/constants/baseConstant';
export default function SubscribedProductsPay({
  selectedDate,
  orderData,
}: {
  selectedDate: DateData | null;
  orderData: any;
}) {
  const dispatch = useDispatch();
  const { subTotal, subCartItems } = useSelector((s: RootState) => s.subCart);
  const user = useSelector((s: RootState) => s.user?.user?.user);
  const subscription = useSelector((s: RootState) => s.user?.subscription);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const cartItemsList = Object.values(subCartItems) || [];
  
  // Check if subscription amount is sufficient
  const hasEnoughPoints = subscription?.pointsPerCycle && user?.points && subscription.pointsPerCycle <= user.points;
  const remainingPoints = user?.points ? user.points - subTotal : 0;

  const startSubscription = async () => {
    if (!selectedDate) {
      return Toast.show({
        type: 'error',
        text1: 'Please select delivery date',
        position: 'top',
      });
    }

    if (!hasEnoughPoints) {
      Toast.show({
        type: 'error',
        text1: 'Onvoldoende punten',
        text2: 'Je hebt niet genoeg punten voor deze bestelling.',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare order items like in web version
      const orderItems = cartItemsList.map((item) => {
        let productString = '';
        
        if (item.categories.includes("Pakket Samenstellen") && (item as any).selectedItems) {
          const productCounts = (item as any).selectedItems.reduce((acc: any, it: any) => {
            acc[it.productId] = (acc[it.productId] || 0) + 1;
            return acc;
          }, {});

          productString = Object.entries(productCounts)
            .map(([productId, quantity]) => `${productId}:${quantity}`)
            .join(",");
        }

        const thumbnail = item.thumbnail?.url?.includes("https://fitpreps.nl/wp-content/") 
          ? item.thumbnail.url.replace("https://fitpreps.nl/wp-content/", `${process.env.EXPO_PUBLIC_BACKEND_URI}/`)
          : `${process.env.EXPO_PUBLIC_BACKEND_URI}/uploads/${item.thumbnail?.url || ''}`;

        return {
          order_item_name: item.name,
          meta: {
            _qty: item.quantity,
            _line_total: (item.metadata?.coin || 0) * item.quantity,
            _id: item._id,
            _cartstamp: item.metadata?._yith_wcpb_bundle_data !== 's:0:"";' 
              ? (item.metadata?._yith_wcpb_bundle_data || null) 
              : null,
            _asnp_wepb_items: productString || null,
            _thumbnail: thumbnail
          }
        };
      });

      const response = await fetch(`${baseUrl}/api/subscription/start-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: subscription?.userId || user?._id,
          pointsUsed: parseInt(subTotal.toString()),
          items: orderItems,
          startDate: selectedDate.dateString,
        }),
      });
   
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Reset cart and navigate to success
          dispatch(resetSubCart());
          Toast.show({
            type: 'success',
            text1: 'Bestelling geplaatst!',
            text2: 'Je abonnement is succesvol gestart.',
          });
          router.push('/subscription');
        } else {
          throw new Error(data.message || 'Bestelling mislukt');
        }
      } else {
        throw new Error('Network error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      Toast.show({
        type: 'error',
        text1: 'Fout',
        text2: 'Er is iets misgegaan bij het plaatsen van je bestelling.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <YStack flex={1} pb="$5">
      <XStack alignItems="center" justifyContent="space-between">
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          To Pay
        </Text>
        <Ionicons name="chevron-up" size={18} color="black" />
      </XStack>
      <YStack mt="$3" flex={1}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            Subtotal
          </Text>
          <XStack gap={2}>
            <Coin />
            <Text fontSize={14} fontWeight={500} color="#1E1F20">
              {subTotal}
            </Text>
          </XStack>
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            Shipping cost
          </Text>
          <Text fontSize={14} fontWeight={500} color="#1E1F20">
            €0
          </Text>
        </XStack>
      </YStack>
      <View my={'$2'} bg="#B6BAC3" height={1}></View>
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontWeight={700} fontSize={14} color="#1E1F20">
          Total
        </Text>
        <XStack gap={2}>
          <Coin />
          <Text fontWeight={700} fontSize={14} color="#1E1F20">
            {subTotal}
          </Text>
        </XStack>
      </XStack>
      
      {/* Points remaining */}
      <XStack alignItems="center" justifyContent="space-between" mt="$2">
        <Text fontSize={12} fontWeight={600} color="#1E1F20">
          Punten over:
        </Text>
        <XStack gap={2}>
          <Coin />
          <Text fontSize={12} fontWeight={600} color="#009A21">
            {Math.max(0, remainingPoints)}
          </Text>
        </XStack>
      </XStack>
      
      {/* Info text */}
      <View bg="#FFF9F7" borderRadius={8} p="$2" mt="$2">
        <Text fontSize={10} textAlign="center" color="#6B7280">
          De resterende punten worden bij de volgende bestelling meegenomen.
        </Text>
      </View>

      <Button
        mt="$3"
        bg={hasEnoughPoints ? "#FD4F01" : "#ccc"}
        borderRadius={8}
        fontSize={16}
        fontWeight={700}
        color="white"
        disabled={!hasEnoughPoints || isLoading}
        opacity={hasEnoughPoints ? 1 : 0.6}
        onPress={startSubscription}>
        {isLoading ? (
          <XStack alignItems="center" gap="$2">
            <Spinner size="small" color="white" />
            <Text color="white" fontSize={16} fontWeight={700}>
              Bezig...
            </Text>
          </XStack>
        ) : (
          'BESTELLING PLAATSEN'
        )}
      </Button>
    </YStack>
  );
}
