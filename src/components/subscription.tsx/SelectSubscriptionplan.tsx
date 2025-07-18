import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Text, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import { router } from 'expo-router';
import { subscriptionPlans } from '~/src/constant';
import Toast from 'react-native-toast-message';
export default function SelectSubscriptionPlan({
  isUpgradePlan = false,
}: {
  isUpgradePlan?: boolean;
}) {
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
  const [packId, setPackId] = useState<string | null>('weekly1');
  const [plan, setPlan] = useState(subscriptionPlans[0].plans[0]);
  const handleSubscription = () => {
    if (!plan) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a plan',
      });
      return;
    } else {
      router.push({
        pathname: '/sub-cart/purchase-sub-cart',
        params: {
          selectedPlan: JSON.stringify(plan),
          // cartType: 'subscription',
          // subscriptionType: selectedPlan.name === 'Weekly plan' ? 'weekly' : 'monthly',
          // packId: plan,
        },
      });
    }
  };
  const handleSelectedPlan = (plan: any) => {
    setPackId(plan.id);
    setPlan(plan);
  };
  return (
    <YStack gap="$7" py="$5" px="$4" backgroundColor="#fff3d7" borderRadius={12} w={'100%'}>
      <YStack w={'100%'}>
        <XStack gap={12} width="100%">
          {subscriptionPlans.map((plan, i) => (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedPlan(plan)} key={i}>
              <YStack
                p={12}
                gap={8}
                borderTopLeftRadius={plan.name === selectedPlan.name ? 12 : 0}
                borderTopRightRadius={plan.name === selectedPlan.name ? 12 : 0}
                backgroundColor={plan.name === selectedPlan.name ? 'white' : 'transparent'}>
                <Text fontSize={16} color="#1E1F20" fontWeight={700}>
                  {plan.name}
                </Text>
                <Text
                  alignSelf="flex-start"
                  color={plan.name === selectedPlan.name ? 'white' : '#009A21'}
                  backgroundColor={plan.name === selectedPlan.name ? '#01B528' : '#E5F8EA'}
                  fontWeight={700}
                  fontSize={10}
                  p={8}
                  borderRadius={20}>
                  Save {plan.save}%
                </Text>
              </YStack>
            </TouchableOpacity>
          ))}
        </XStack>
        <YStack
          borderRadius={12}
          borderTopEndRadius={selectedPlan.name === 'Weekly Plan' ? 8 : 0}
          borderTopStartRadius={selectedPlan.name === 'Weekly Plan' ? 0 : 8}
          py="$5"
          px="$3"
          bg="white"
          gap={8}>
          {selectedPlan.plans.map((plan, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => handleSelectedPlan(plan)}>
                <YStack
                  gap={12}
                  px="$3"
                  py="$3"
                  borderRadius={8}
                  borderWidth={plan.id.toString() === packId?.toString() ? 2 : 1}
                  borderColor={plan.id.toString() === packId?.toString() ? '#FFA67D' : '#D8DBDF'}>
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={8}>
                      <XStack>
                        <Text color="#1E1F20" fontSize={14} fontWeight={700}>
                          {plan.name}
                        </Text>
                      </XStack>
                      <XStack alignItems="center" justifyContent="center">
                        <Text
                          borderRadius={40}
                          color="#D24100"
                          fontSize={10}
                          fontWeight={700}
                          px="$2"
                          bg="#FFDADF">
                          {plan.badge}
                        </Text>
                      </XStack>
                    </XStack>
                    <Text color="#25272C" fontSize={14} fontWeight={700}>
                      {Number(plan.price).toFixed(2)}
                    </Text>
                  </XStack>
                  <XStack alignItems="center" justifyContent="space-between">
                    <XStack alignItems="center" gap={8}>
                      <XStack alignItems="center" gap={4}>
                        <Text fontSize={12} fontWeight={700} color="#FD4F01">
                          {plan.coins}
                        </Text>
                        <Coin />
                      </XStack>
                      <Text fontSize={16} fontWeight={700} color="#1E1F20">
                        +
                      </Text>
                      <XStack alignItems="center" gap={4}>
                        <Text fontSize={12} fontWeight={700} color="#FD4F01">
                          {plan.bonusCoins}
                        </Text>
                        <Coin />
                        <Text
                          color="#009A21"
                          fontSize={12}
                          fontWeight={700}
                          px={8}
                          py={4}
                          borderRadius={40}
                          bc="#E5F8EA">
                          FREE
                        </Text>
                      </XStack>
                    </XStack>
                    <Text fontSize={11} color="#25272C" fontWeight={500}>
                      {plan.shippingPrice ? '+ €6.95 Shipping' : '  Free Shipping'}
                    </Text>
                  </XStack>
                  <Text fontSize={12} fontWeight={500} color="#25272C">
                    Average{' '}
                    <Text fontSize={12} fontWeight={500} color="#25272C">
                      ~{plan.average}
                    </Text>{' '}
                    meals
                  </Text>
                </YStack>
              </TouchableOpacity>
            );
          }, [])}
        </YStack>
      </YStack>
      {!isUpgradePlan ? (
        <Button
          borderRadius={12}
          bg="#FD4F01"
          color="white"
          fontSize={14}
          fontWeight={700}
          onPress={handleSubscription}>
          {selectedPlan.name === 'Weekly Plan' ? 'Buy Weekly Plan' : 'Buy Monthly Plan'}
        </Button>
      ) : (
        <Button
          borderRadius={12}
          bg="#FD4F01"
          color="white"
          fontSize={14}
          fontWeight={700}
          onPress={() =>
            router.push({
              pathname: '/cart',
              params: {
                cartType: 'subscription',
                subscriptionType: 'upgrade',
              },
            })
          }>
          Upgrade Now
        </Button>
      )}
    </YStack>
  );
}
