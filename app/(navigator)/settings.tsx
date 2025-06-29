import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import { shadows } from '~/constant';
import SettingsAccordion from '~/components/settings/SettingsAccordion';
import NotificationSetting from '~/components/settings/NotificationSetting';

export default function Settings() {
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={{ ...style.container }}>
        <DrawerPageHeader title="Settings" />

        <YStack f={1} px="$4" py="$5" gap="$7">
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$7">
              <YStack gap="$3">
                <YStack gap="$2">
                  <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                    Fitness & Nutrition Preferences
                  </Text>
                  <Text color="#1E1F20" fontSize={14}>
                    Tailor your experience to your health goals and dietary needs. You can update
                    these anytime.
                  </Text>
                </YStack>
                <SettingsAccordion />
              </YStack>
              <NotificationSetting />
            </YStack>
          </ScrollView>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    ...shadows.small,
  },
});
