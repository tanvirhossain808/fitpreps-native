import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import TopSearchbar from '~/components/shared/TopSearchbar';
import { ProgressChart } from '~/components/tracking/ProgressChart';
import SelectedMeals from '~/components/tracking/SelectedMeals';
import { mealsLists } from '~/constant';
import SelectMeal from '~/components/tracking/tracking-log/SelectMeal';
import useKeyboardBehavior from '~/hooks/useKeyBoardBehavior';
import ProductScanner from '~/components/shared/scanner/ProductScanner';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
export default function AddFoodCals() {
  const { keyboardBehavior, isKeyboardVisible } = useKeyboardBehavior();
  const [open, setOpen] = useState(false);

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
            action={() => router.push('/(navigator)/log')}
            isTrackingScreen={true}
            placeholder="Log Food Calories"
            showBackButton={true}
          />
        </XStack>
        <SafeAreaView style={{ ...style.container }} edges={['bottom', 'left', 'right']}>
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
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
                {mealsLists.map((item, i) => (
                  <YStack key={i}>
                    <Text fontSize={14} fontWeight={500}>
                      {item.name}
                    </Text>
                    {item.lists.map((list, i) => (
                      <SelectedMeals key={i} action={() => {}} buttonType="cancel" />
                    ))}
                  </YStack>
                ))}
              </YStack>
              <YStack gap="$5" py="$5">
                <SelectMeal
                  showFoodCalToast={showFoodCalToast}
                  setOpen={setOpen}
                  isKeyboardVisible={isKeyboardVisible}
                />
              </YStack>
              {open && (
                <ProductScanner open={open} showFoodCalToast={showFoodCalToast} setOpen={setOpen} />
              )}
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
