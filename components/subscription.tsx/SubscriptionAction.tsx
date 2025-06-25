import { TouchableOpacity } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

export default function SubscriptionAction() {
  return (
    <YStack bg="white" gap="$7">
      <YStack gap={12}>
        {action.map(({ name, path }, i) => (
          <TouchableOpacity key={i} onPress={() => router.push(path)}>
            <BlurView intensity={30}>
              <XStack
                backgroundColor="#F6F6F8"
                py="$5"
                borderRadius={12}
                px="$4"
                alignItems="center"
                justifyContent="space-between">
                <Text color="black">{name}</Text>
                <Feather name="chevron-right" size={24} color="#1E1F20" />
              </XStack>
            </BlurView>
          </TouchableOpacity>
        ))}
      </YStack>
      <YStack gap={8}>
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          NOTE:
        </Text>
        <Text fontSize={14} fontWeight={500} color="#1E1F20">
          Whatever you choose, it’ll take effect{' '}
          <Text fontSize={14} fontWeight={500} color="#FD4F01">
            on Mnth XX, 2025.
          </Text>{' '}
          You&apos;ll still be able to watch until then.
        </Text>
      </YStack>
    </YStack>
  );
}

const action = [
  { name: 'Upgrade Subscription', path: '/(subscription)/upgradeSubscription' as const },
  { name: 'Pause Subscription', path: '/(subscription)/pauseSubscription' as const },
  { name: 'Cancel Subscription', path: '/(subscription)/cancelSubscription' as const },
];
