import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';
import { subcriptionBadges, subscriptionPlans, weeklyPlans } from '~/constant';
import Coin from 'public/images/coin.svg';
export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);
  const [packId, setPackId] = useState<string | null>('weekly1');
  return (
    <>
      <StatusBar style="dark" />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <YStack gap="$7" flex={1}>
            <XStack alignItems="center" gap={8} py="$4">
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
              </TouchableOpacity>
              <Text fontWeight={700} fontSize={20} color="#1E1F20">
                Select Subscription
              </Text>
            </XStack>
            <YStack>
              <Text fontSize={20} fontWeight={700} color="#1E1F20">
                Welcome{' '}
                <Text fontSize={20} fontWeight={700} color="#FD4F01">
                  User!
                </Text>
              </Text>
              <Text fontSize={14} fontWeight={500} color="#1E1F20">
                Select a plan below to start getting points and enjoying fresh, fitness-focused
                meals delivered to your door.
              </Text>
            </YStack>
            <YStack gap="$7" py="$5" px="$4" backgroundColor="#fff3d7" borderRadius={12} w={'100%'}>
              <YStack w={'100%'}>
                <XStack gap={12} width="100%">
                  {subscriptionPlans.map((plan, i) => (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => setSelectedPlan(plan)}
                      key={i}>
                      <YStack
                        p={12}
                        gap={8}
                        borderWidth={2}
                        borderRadius={12}
                        backgroundColor={plan.name === selectedPlan.name ? '#FFEDE5' : 'white'}
                        borderColor={plan.name === selectedPlan.name ? '#FFA67D' : 'white'}>
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
                <YStack mt={10} borderRadius={12} py="$5" px="$3" bg="white" gap={8}>
                  {selectedPlan.plans.map((plan, i) => {
                    return (
                      <TouchableOpacity key={i} onPress={() => setPackId(plan.id)}>
                        <YStack
                          gap={12}
                          px="$4"
                          py="$3"
                          borderRadius={8}
                          borderWidth={plan.id.toString() === packId?.toString() ? 2 : 1}
                          borderColor={
                            plan.id.toString() === packId?.toString() ? '#FFA67D' : '#D8DBDF'
                          }>
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
                              {plan.price}
                            </Text>
                          </XStack>
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
                        </YStack>
                      </TouchableOpacity>
                    );
                  }, [])}
                </YStack>
              </YStack>
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
                      subscriptionType: selectedPlan.name === 'Weekly plan' ? 'weekly' : 'monthly',
                      packId: selectedPlan.plans[0].id,
                    },
                  })
                }>
                {selectedPlan.name === 'Weekly Plan' ? 'Buy Weekly Plan' : 'Buy Monthly Plan'}
              </Button>
            </YStack>
            <YStack>
              <XStack alignItems="center">
                <XStack bg="rgba(248, 210, 68, 0.49)" py={8} borderTopStartRadius={12} width="50%">
                  <Text
                    textAlign="center"
                    width={'100%'}
                    color="#FD4F01"
                    textTransform="uppercase"
                    fontSize={24}
                    fontWeight={700}>
                    weekly{' '}
                  </Text>
                </XStack>
                <XStack bg="rgba(255, 116, 53, 0.15)" py={8} borderTopEndRadius={12} width="50%">
                  <Text
                    flex={1}
                    textTransform="uppercase"
                    textAlign="center"
                    color="#FD4F01"
                    fontSize={24}
                    fontWeight={700}>
                    MONTHLY
                  </Text>
                </XStack>
              </XStack>
              <XStack alignItems="center" mt={4}>
                <Text
                  top={-15}
                  fontStyle="italic"
                  zIndex={20}
                  position="absolute"
                  width={'100%'}
                  textAlign="center"
                  fontSize={18}
                  fontWeight={700}
                  color="#1E1F20">
                  V/S
                </Text>
              </XStack>
              <XStack width={'100%'}>
                <YStack
                  width="50%"
                  gap={8}
                  py={12}
                  px={8}
                  bg="rgba(248, 210, 68, 0.49)"
                  borderBottomLeftRadius={12}>
                  {weeklyPlans.map((plan, i) => {
                    return (
                      <YStack key={i} w={'100%'} alignSelf="stretch">
                        <XStack alignItems="center" gap={4}>
                          {plan.img()}
                          <Text
                            fontSize={11}
                            flexShrink={1}
                            fontWeight={500}
                            color="#FD4F01"
                            w={'100%'}>
                            {plan.name}
                          </Text>
                        </XStack>
                      </YStack>
                    );
                  })}
                </YStack>
                <YStack
                  width="50%"
                  gap={8}
                  py={12}
                  px={8}
                  bg="rgba(255, 116, 53, 0.15)"
                  borderBottomRightRadius={12}>
                  {weeklyPlans.map((plan, i) => {
                    return (
                      <YStack key={i}>
                        <XStack alignItems="center" gap={4}>
                          {plan.img()}
                          <Text
                            fontSize={11}
                            flexShrink={1}
                            fontWeight={500}
                            color="#FD4F01"
                            w={'100%'}>
                            {plan.name}
                          </Text>
                        </XStack>
                      </YStack>
                    );
                  })}
                </YStack>
              </XStack>
            </YStack>
            <XStack
              width="100%"
              maxWidth="100%"
              overflow="hidden"
              gap={8}
              justifyContent="space-between">
              {subcriptionBadges.map((badge, i) => (
                <YStack key={i} flex={1} padding={4} gap={8} maxWidth="75">
                  {badge.icon()}
                  <Text
                    fontSize={11}
                    fontWeight={500}
                    color="#1E1F20"
                    numberOfLines={3}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}>
                    {badge.name}
                  </Text>
                </YStack>
              ))}
            </XStack>
          </YStack>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
    backgroundColor: 'white',
  },
});
