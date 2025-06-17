import { Spinner, YStack } from 'tamagui';

export default function LoadingSpinner({ color }: { color: string }) {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
      <Spinner size="large" color={color} />
    </YStack>
  );
}
