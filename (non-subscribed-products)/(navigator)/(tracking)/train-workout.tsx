import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import TopSearchbar from '~/src/components/shared/TopSearchbar';
import useKeyboardBehavior from '~/src/hooks/useKeyBoardBehavior';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import CuratedbyTrainer from '~/src/components/tracking/workout/CuratedbyTrainer';
import YourWorkout from '~/src/components/tracking/workout/YourWorkout';
export default function TrainWorkout() {
  const { keyboardBehavior } = useKeyboardBehavior();
  const { workoutBy } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const showFoodCalToast = () => {
    Toast.show({
      type: 'foodCaroleSuccessToast',
      position: 'bottom',
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ ...style.container }}
      behavior={keyboardBehavior as 'padding' | 'height' | 'position' | undefined}>
      <YStack f={1} bg="$background">
        <XStack pt={insets.top} bg="$tracking-primary" borderRadius={20}>
          <TopSearchbar
            textProps={{
              textAlign: 'left',
            }}
            action={() => router.push('/(navigator)/workout')}
            isTrackingScreen={true}
            placeholder="Workouts"
            showBackButton={true}
          />
        </XStack>
        <SafeAreaView style={{ ...style.container }} edges={['bottom', 'left', 'right']}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
            <YStack f={1} px="$4" py="$3">
              {workoutBy === 'bytrainer' ? <CuratedbyTrainer /> : <YourWorkout />}
            </YStack>
          </ScrollView>
        </SafeAreaView>
      </YStack>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
