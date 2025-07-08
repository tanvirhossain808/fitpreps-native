import React from 'react';
import { Button, Image, Text, XStack, YStack } from 'tamagui';
import ArrowNarrowUpRight from 'public/images/arrow-narrow-up-right.svg';
import { shadows } from '~/src/constant';
export default function WeeklyOffer() {
  return (
    <>
      <Text textAlign="center" fontSize={24} fontWeight={800}>
        Weekly Offer - Don&apos;t miss it
      </Text>
      <YStack gap="$7" bg="#FAD759" borderRadius={12} overflow="hidden">
        <XStack w="100%">
          <Image
            width={363}
            height={233}
            src={require('public/images/home/intro-products/Fitpreps (35) 2.png')}
          />
        </XStack>
        <YStack gap="$5" px="$4" py="$5">
          <Text textAlign="center" fontSize={20} fontWeight={700}>
            Fresh Meals, Zero Prep
          </Text>
          <Text textAlign="center" fontSize={14} fontWeight={500}>
            Order any weekly meal plan today and grab 25 % off every meal or vitamin pack in the
            cart.
          </Text>
          <XStack alignItems="center" justifyContent="center">
            <Button
              bg="#FD4F01"
              {...shadows.small}
              color="white"
              fontSize={16}
              fontWeight={700}
              px={20}
              iconAfter={<ArrowNarrowUpRight />}>
              Use Code Now
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </>
  );
}
