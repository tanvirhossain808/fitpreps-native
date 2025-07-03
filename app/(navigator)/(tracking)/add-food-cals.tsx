import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import TopSearchbar from '~/components/shared/TopSearchbar';
import { ProgressChart } from '~/components/tracking/ProgressChart';
import SelectedMeals from '~/components/tracking/SelectedMeals';
import { breakFast } from '~/constant';
import Ionicons from '@expo/vector-icons/Ionicons';
import SelectMealsTitle from '~/components/tracking/tracking-log/SelectMealsTitle';
export default function AddFoodCals() {
  const insets = useSafeAreaInsets();
  return (
    <YStack f={1} bg="$background">
      <XStack pt={insets.top} bg="$tracking-primary" borderRadius={20}>
        <TopSearchbar
          isTrackingScreen={true}
          placeholder="Log Food Calories"
          showBackButton={true}
        />
      </XStack>
      <SafeAreaView style={{ ...style.container }} edges={['bottom', 'left', 'right']}>
        <ScrollView>
          <YStack f={1} px="$4">
            <YStack py="$5">
              <ProgressChart />
            </YStack>
            <YStack
              gap="$2"
              bg="#F6F6F8"
              borderWidth={1}
              borderColor=" 1px solid rgba(0, 0, 0, 0.10)"
              borderRadius={8}
              p="$3"
              py="$5">
              {breakFast.map((_, i) => (
                <SelectedMeals key={i} action={() => {}} buttonType="cancel" />
              ))}
            </YStack>
            <YStack gap="$5" py="$5">
              <SelectMealsTitle />
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
