import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import Coin from '~/public/images/coin.svg';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function SubscribedCoin() {
  const isIscrolling = useSelector((s: RootState) => s.scroll);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isIscrolling ? 0 : 1, { duration: 300 }),
      height: withTiming(isIscrolling ? 0 : 140, { duration: 300 }),
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <YStack pt={24} p={20} pb={0} w="100%" gap={12}>
        <Text color="#1E1F20" fontSize={16} fontWeight={700}>
          Good Morning{' '}
          <Text fontSize={16} fontWeight={700} color="#FF7435">
            User!
          </Text>
        </Text>

        <YStack borderRadius={8} overflow="hidden">
          <ImageBackground
            style={styles.imageBackground}
            source={require('~/public/images/Status Card.png')}>
            <Text color="#1E1F20" fontSize={12} fontWeight={500}>
              Current subscription
            </Text>
            <XStack alignItems="center" gap={4} justifyContent="space-between">
              <Text fontSize={16} color="#1E1F20" fontWeight={700} mt={1}>
                Weekly | Starter Pack
              </Text>
              <XStack alignItems="center" gap={4}>
                <Text fontSize={14} color="#FD4F01" fontWeight={700}>
                  60
                </Text>
                <Text fontSize={14} color="#FD4F01" fontWeight={700}>
                  /
                </Text>
                <Text fontSize={14} color="#FD4F01" fontWeight={700}>
                  60
                </Text>
                <Coin />
              </XStack>
            </XStack>
          </ImageBackground>
        </YStack>
      </YStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 80,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
