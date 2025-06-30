import { ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import { selectedItems } from '~/constant';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function () {
  const [pressButton, setPressButton] = useState<string | null>(null);

  const { product } = useLocalSearchParams();
  const selectedScreen = selectedItems.find((data) => data.name === product);
  if (!selectedScreen) {
    return (
      <View>
        <Text>data not found</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <ImageBackground source={selectedScreen.img} style={{ flex: 1 }} resizeMethod="resize">
        <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
          <YStack flex={1}>
            <XStack py="$7" px="$4">
              <TouchableOpacity onPress={() => router.back()}>
                <Feather name="chevron-left" size={24} color="white" />
              </TouchableOpacity>
              <YStack flex={1} alignItems="center" gap={'$3'}>
                <Image
                  source={selectedScreen.titleBanner}
                  w={selectedScreen.titleBannerWidth}
                  h="40"
                />
                <Text fontWeight={700} color="white" fontSize={14} textAlign="center">
                  {selectedScreen.title}
                </Text>
              </YStack>
              <View w={24}></View>
            </XStack>
            <YStack flex={1} justifyContent="flex-end">
              <YStack maxHeight={390} justifyContent="flex-end" flex={1}>
                <YStack flex={1} maxHeight={390} pt={20} py={40} gap={28}>
                  <Text textAlign="center" fontSize={16} color={'white'} fontWeight={700}>
                    {selectedScreen.subtitle}
                  </Text>
                  <XStack justifyContent="center" gap="28">
                    <TouchableOpacity onPress={() => setPressButton('meal')}>
                      <YStack
                        gap={10}
                        p="$2"
                        backgroundColor={'white'}
                        borderWidth={2}
                        borderColor={pressButton === 'meal' ? '#FD4F01' : '$colorTransparent'}
                        borderRadius={20}>
                        <Image
                          source={require('public/images/shared/selecmels.png')}
                          borderRadius={12}
                          w={100}
                          h={100}
                        />
                        <View maxWidth={100}>
                          <Text color="#FD4F01" textAlign="center" fontSize={14} fontWeight={700}>
                            Buy Meals
                          </Text>
                          <Text
                            textAlign="center"
                            color="#FD4F01"
                            mt="$1"
                            fontSize={12}
                            fontWeight={500}>
                            Fresh meals whenever you need
                          </Text>
                        </View>
                      </YStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPressButton('subscription')}>
                      <YStack
                        flex={1}
                        gap={10}
                        p="$2"
                        backgroundColor={'rgba(255, 255, 255, 0.25)'}
                        borderWidth={2}
                        borderColor={
                          pressButton === 'subscription' ? '#FD4F01' : '$colorTransparent'
                        }
                        borderRadius={20}>
                        <Image
                          source={require('public/images/shared/selectsub.png')}
                          borderRadius={12}
                          w={100}
                          h={100}
                        />
                        <View maxWidth={100}>
                          <Text color="white" textAlign="center" fontSize={14} fontWeight={700}>
                            Subscription
                          </Text>
                          <Text
                            textAlign="center"
                            color="white"
                            mt="$1"
                            fontSize={12}
                            fontWeight={500}>
                            Fresh meals & savings daily
                          </Text>
                        </View>
                      </YStack>
                    </TouchableOpacity>
                  </XStack>
                  <XStack justifyContent="center">
                    <Button
                      disabled={pressButton === null}
                      onPress={() =>
                        router.push({
                          pathname:
                            pressButton === 'meal' ? '/(tabs)/meals' : '/(tabs)/subscription',
                          params: { product },
                        })
                      }
                      py={'$3'}
                      color="white"
                      fontWeight={700}
                      fontSize={16}
                      borderRadius={8}
                      px={'$5'}
                      backgroundColor="#FD4F01">
                      Get Started
                    </Button>
                  </XStack>
                </YStack>
              </YStack>
            </YStack>
          </YStack>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
