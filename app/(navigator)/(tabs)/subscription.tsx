import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import SelectSubscriptionPlan from '~/components/subscription.tsx/SelectSubscriptionplan';
import WeeklyVsMonthlyPlan from '~/components/subscription.tsx/WeeklyVsMonthlyPlan';
import SubscriptionFooterInfo from '~/components/subscription.tsx/SubscriptionFooterInfo';
export default function Home() {
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
            <SelectSubscriptionPlan />
            <WeeklyVsMonthlyPlan />
            <SubscriptionFooterInfo />
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
