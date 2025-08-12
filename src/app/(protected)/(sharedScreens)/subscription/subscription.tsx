import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

import CoinSubscriber from '../partials/CoinSubscriber';
import WithoutCoinSubscriber from '../partials/WithoutCoinSubscriber';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
export default function subscription() {
  const subscription=useSelector((state:RootState)=>state.user.subscription)
  const haveCoin = false;
  return (
    <YStack f={1} bg="white">
      <StatusBar style="light" />
      <ImageBackground
        style={{ ...styles.container }}
        source={require('public/images/subscription/subscriptionBanner.png')}>
        <SafeAreaView style={{ ...styles.container }}>
          <YStack f={1} px="$4" justifyContent="space-between">
            <XStack w="100%" py={28} justifyContent="space-between">
              <TouchableOpacity style={{ ...styles.backBtn }} onPress={() => router.back()}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
              <YStack gap={12}>
                <Text color="white" fontSize={32} fontWeight={800}>
                  Subscription
                </Text>
                <Text textAlign="center" color="white" fontWeight={700} fontSize={14}>
                  Simple, fast, and flexible.{' '}
                </Text>
              </YStack>
              <TouchableOpacity style={{ ...styles.rightBtn }}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
            </XStack>
            {subscription?._id ? <CoinSubscriber subscription={subscription} /> : <WithoutCoinSubscriber />}
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
