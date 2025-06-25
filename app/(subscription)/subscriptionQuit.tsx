import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, Text, XStack, YStack } from 'tamagui';

export default function SubscriptionQuit() {
  const { type } = useLocalSearchParams() || {};

  return (
    <YStack flex={1} bg="white">
      <YStack flex={1} position="relative" width="100%" aspectRatio={390 / 844}>
        <Image
          source={require('public/images/orderplaced.png')}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <BlurView
            intensity={60}
            // experimentalBlurMethod="dimezisBlurView"
            tint="light"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            <YStack
              bg="linear-gradient(0deg, rgba(255, 184, 23, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%)"
              flex={1}
              px="$7"
              py="$2">
              <YStack
                style={{
                  borderRadius: 12,
                  paddingVertical: 16,
                }}
                gap="$7">
                <YStack>
                  {type === 'cancel' && (
                    <Text fontSize={24} fontWeight="700" color="#009A21" textAlign="center">
                      Your Subscription’s Been Cancelled
                    </Text>
                  )}
                  {type === 'paused' && (
                    <Text fontSize={24} fontWeight="700" color="#009A21" textAlign="center">
                      Your Subscription Is on Pause
                    </Text>
                  )}
                </YStack>

                {type === 'cancel' && (
                  <Text textAlign="center" color="#1E1F20" fontSize={16} fontWeight={500}>
                    Thanks for being part of the journey. We’ll miss you — but if you’re ever ready
                    to come back, we’ll be right here.
                  </Text>
                )}
                {type === 'paused' && (
                  <Text textAlign="center" color="#1E1F20" fontSize={16} fontWeight={500}>
                    Taking a breather? Totally get it. Your plan’s paused, but everything will be
                    right here when you’re ready to jump back in
                  </Text>
                )}
                <XStack justifyContent="center">
                  <Button
                    // onPress={() => {
                    //   if (type === 'meals') {
                    //     router.push('/(tabs)/meals');
                    //   } else {
                    //     router.replace({
                    //       pathname: '/(tabs)/meals',
                    //       params: {},
                    //     });
                    //   }
                    // }}
                    onPress={() => router.replace('/(navigator)/(tabs)')}
                    minWidth={164}
                    backgroundColor="#FD4F01"
                    borderRadius={8}
                    color="white"
                    fontWeight={700}>
                    {type === 'cancel' ? 'Reactivate Anytime' : 'Resume Anytime'}
                  </Button>
                </XStack>
              </YStack>
            </YStack>
          </BlurView>
        </SafeAreaView>
      </YStack>
    </YStack>
  );
}
