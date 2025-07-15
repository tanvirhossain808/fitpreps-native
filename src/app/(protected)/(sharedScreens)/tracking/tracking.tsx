import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import CoinSubscriber from '../partials/CoinSubscriber';
import WithoutCoinSubscriber from '../partials/WithoutCoinSubscriber';
import { shadows } from '~/src/constant';
export default function subscription() {
  const haveCoin = false;
  return (
    <YStack f={1} bg="white">
      <StatusBar style="light" />
      <ImageBackground
        style={{ ...styles.container }}
        source={require('public/images/tracking/trackingBanner.png')}>
        <SafeAreaView style={{ ...styles.container }}>
          <YStack f={1} px="$4" justifyContent="space-between">
            <XStack py={28} justifyContent="space-between">
              <TouchableOpacity style={{ ...styles.backBtn }} onPress={() => router.back()}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
              <YStack gap={12}>
                <Text color="white" fontSize={32} fontWeight={800}>
                  Tracking
                </Text>
              </YStack>
              <Text
                top={70}
                position="absolute"
                w="100%"
                left={0}
                right={0}
                width="100%"
                textAlign="center"
                color="white"
                fontWeight={700}
                fontSize={14}>
                Track smarter. Eat better. Reach your goals.
              </Text>
              <TouchableOpacity style={{ ...styles.rightBtn }}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
            </XStack>
            <YStack gap="$7" py="$10">
              <YStack gap={10} alignItems="center">
                <Text color="white" fontSize={20} fontWeight={700}>
                  Smarter Tracking Starts Here
                </Text>
                <Text color="white" fontSize={16} fontWeight={500} textAlign="center">
                  Personalized insights, effortless logging, real results.
                </Text>
              </YStack>
              <XStack justifyContent="center">
                <Button
                  {...shadows.small}
                  color="white"
                  fontSize={16}
                  fontWeight={700}
                  onPress={() => router.push('/goal-step')}
                  bg="#FD4F01"
                  px="$5">
                  Set Your Goal
                </Button>
              </XStack>
              <XStack justifyContent="center" gap="$3" alignItems="center">
                <Text fontWeight={500} fontSize={16} color="white">
                  Are you a trainer?
                </Text>
                <TouchableOpacity>
                  <Text
                    color="#FD4F01"
                    fontSize={16}
                    fontWeight={700}
                    borderBottomColor="#FD4F01"
                    borderBottomWidth={2}>
                    Log In
                  </Text>
                </TouchableOpacity>
              </XStack>
              <TouchableOpacity>
                <XStack justifyContent="center">
                  <TouchableOpacity>
                    <Text
                      color="#FD4F01"
                      fontSize={16}
                      fontWeight={700}
                      borderBottomColor="#FD4F01"
                      borderBottomWidth={2}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                </XStack>
              </TouchableOpacity>
            </YStack>
          </YStack>
        </SafeAreaView>
      </ImageBackground>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    marginTop: 9,
  },
  rightBtn: {
    opacity: 0,
  },
});
