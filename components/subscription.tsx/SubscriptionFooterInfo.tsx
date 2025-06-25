import { Text, XStack, YStack } from 'tamagui';
import { subcriptionBadges } from '~/constant';

export default function SubscriptionFooterInfo() {
  return (
    <XStack width="100%" maxWidth="100%" overflow="hidden" gap={8} justifyContent="space-between">
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
  );
}
