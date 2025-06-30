import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import CurrentlySubscription from '~/components/subscription.tsx/CurrentlySubscription';
import SubscriptionAction from '~/components/subscription.tsx/SubscriptionAction';

export default function manageSubscription() {
  const height = Dimensions.get('screen').height;
  return (
    <YStack flex={1} bg="white">
      <ScrollView>
        <SafeAreaView style={{ flex: 1, height }}>
          <DrawerPageHeader title="Manage Subscription" />
          <YStack px="$4" py="$5" flex={1} justifyContent="space-between">
            <CurrentlySubscription showPlan={false} />
            <SubscriptionAction />
          </YStack>
        </SafeAreaView>
      </ScrollView>
    </YStack>
  );
}
