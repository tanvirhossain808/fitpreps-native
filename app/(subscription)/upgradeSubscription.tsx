import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import CurrentlySubscription from '~/components/subscription.tsx/CurrentlySubscription';
import SelectSubscriptionPlan from '~/components/subscription.tsx/SelectSubscriptionplan';
import SubscriptionFooterInfo from '~/components/subscription.tsx/SubscriptionFooterInfo';
import WeeklyVsMonthlyPlan from '~/components/subscription.tsx/WeeklyVsMonthlyPlan';

export default function upgradeSubscription() {
  return (
    <YStack flex={1} bg="white">
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerPageHeader title="Manage Subscription" />
        <ScrollView>
          <YStack px={'$4'} py="$5" gap="$7">
            <CurrentlySubscription showPlan={true} />
            <SelectSubscriptionPlan isUpgradePlan={true} />
            <SubscriptionFooterInfo />
            <WeeklyVsMonthlyPlan />
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}
