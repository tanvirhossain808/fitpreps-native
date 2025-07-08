import { Stack, router } from 'expo-router';
import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import { Alert, BackHandler, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { selectCategories } from '~/src/constant';
import { useEffect, useState } from 'react';
import TopSearchbar from '~/src/components/shared/TopSearchbar';
import IntroProductSlider from '~/src/components/home/IntroProductSlider';
import { LinearGradient } from 'expo-linear-gradient';
import HomeIntroVideoSlider from '~/src/components/home/HomeIntroVideoSlider';
import ReviewSlider from '~/src/components/home/ReviewSlider';
import WeeklyOffer from '~/src/components/home/WeeklyOffer';
export default function Home() {
  const [selectCategory, setSelectedCategory] = useState<number | null>(null);
  useEffect(() => {
    const backAction = () => {
      if (!router.canGoBack()) {
        // Option 1: Show alert
        Alert.alert("Can't go back", "You're on the home screen");
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          bg={'#fffdf6'}>
          <YStack flex={1} pb="$10">
            <TopSearchbar placeholder="Search here" />
            <YStack flex={1} pt={'$12'}>
              <XStack justifyContent="center">
                <Image source={require('public/images/fitpreps.png')} width={278} height={32} />
              </XStack>
              <YStack alignItems="center" mt="$7">
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Fuelling your fitness.
                </Text>
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Pick your journey.
                </Text>
              </YStack>
              <YStack px={'$2'} mt="$7">
                <XStack justifyContent="center" rowGap="$5" gap="$2" flexWrap="wrap">
                  {selectCategories.map(
                    ({ img, name, width, border, pathName, path, sharedScreen }, i) => (
                      <TouchableOpacity
                        key={i}
                        style={{
                          padding: 3.5,
                          borderWidth: 2,
                          borderRadius: 12,
                          borderColor: selectCategory === i ? border : 'transparent',
                        }}
                        onPress={() => {
                          if (sharedScreen) {
                            router.push({
                              pathname: `/(sharedScreens)/productSelect/${path}` as any,
                            });
                          } else {
                            router.push({
                              pathname: pathName as any,
                              params: { product: path },
                            });
                          }
                        }}
                        onPressIn={() => setSelectedCategory(i)}
                        onPressOut={() => setSelectedCategory(null)}>
                        <Image source={img} width={width} h={'126'} borderRadius={'$3'} />
                      </TouchableOpacity>
                    )
                  )}
                </XStack>
              </YStack>
              <LinearGradient
                colors={['#FFF', '#D0FFDA']}
                locations={[0.4684, 1.7464]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 1 }}>
                <YStack px="$4" gap={40} py={40}>
                  <IntroProductSlider />
                </YStack>
              </LinearGradient>
              <YStack py={40} px={16}>
                <HomeIntroVideoSlider />
              </YStack>
            </YStack>
            <YStack px={16} gap="$7">
              <WeeklyOffer />
            </YStack>
            <YStack py={40} px={16} gap="$7">
              <ReviewSlider />
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
