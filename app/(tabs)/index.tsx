import { Stack, router } from 'expo-router';
import { Image, Input, ScrollView, Text, XStack, YStack } from 'tamagui';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { selectCategories } from '~/constant';
import { useState } from 'react';
import TopSearchbar from '~/components/shared/TopSearchbar';
export default function Home() {
  const [selectCategory, setSelectedCategory] = useState<number | null>(null);
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
                  {selectCategories.map(({ img, name, width, border, pathName, path }, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        padding: 3.5,
                        borderWidth: 2,
                        borderRadius: 12,
                        borderColor: selectCategory === i ? border : 'transparent',
                      }}
                      onPress={() =>
                        router.push({
                          pathname: pathName as any,
                          params: { product: path },
                        })
                      }
                      onPressIn={() => setSelectedCategory(i)}
                      onPressOut={() => setSelectedCategory(null)}>
                      <Image source={img} width={width} h={'126'} borderRadius={'$3'} />
                    </TouchableOpacity>
                  ))}
                </XStack>
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
