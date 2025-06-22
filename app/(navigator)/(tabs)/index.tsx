import { Stack, router } from 'expo-router';
import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';

import { Alert, BackHandler, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { selectCategories } from '~/constant';
import { useEffect, useState } from 'react';
import TopSearchbar from '~/components/shared/TopSearchbar';
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
            <YStack flex={1} pt={'$12'} gap={'$7'}>
              <XStack justifyContent="center">
                <Image source={require('public/images/fitpreps.png')} width={278} height={32} />
              </XStack>
              <YStack alignItems="center">
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Fuelling your fitness.
                </Text>
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  Pick your journey.
                </Text>
              </YStack>
              <YStack px={'$2'} gap={'$5'}>
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
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

{
  /* <YStack height={1000} py="$5">
          <CartExtraFood data={extraFoods} />
        </YStack> */
}

{
  /* <YStack flex={1} gap="$3">
  <Text color="#1E1F20" fontWeight={700} fontSize={16}>
    Savings
  </Text>
  <XStack alignItems="center" gap="$2">
    <XStack
      gap={2}
      flex={1}
      height={'40px'}
      bg="white"
      alignSelf="stretch"
      elevation={1}
      shadowColor="rgba(10, 13, 18, 0.05)"
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={2}
      shadowOpacity={1}
      alignItems="center"
      px={14}
      py={10}
      borderColor="#EDEEF1"
      borderWidth={1}
      borderRadius={8}>
      <CouponTicket />
      <Input
        py={0}
        alignSelf="stretch"
        flex={1}
        placeholder="Enter Coupon Code"
        placeholderTextColor="#8E95A2"
        fontSize={14}
        bg="transparent"
        borderWidth={0}
        outlineWidth={0}
      />
    </XStack>
    <Button
      height={'40px'}
      px={20}
      py={10}
      fontSize={16}
      fontWeight="700"
      color="#FD4F01"
      borderRadius={8}
      borderWidth={1}
      borderColor="#FD4F01"
      h={60}
      bg="white"
      shadowOffset={{ width: 0, height: 1 }}
      shadowRadius={2}
      shadowColor="rgba(10, 13, 18, 0.05)"
      shadowOpacity={1}>
      Add
    </Button>
  </XStack>
</YStack>; */
}
