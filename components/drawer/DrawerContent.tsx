import { TouchableOpacity } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { DrawerNavigation } from '~/types/navigation';
import { useNavigation } from '@react-navigation/native';
import User from '~/public/images/drawer/user-03.svg';
import Group from '~/public/images/drawer/Group (1).svg';
import ShoppingCart from '~/public/images/drawer/shopping-cart-01.svg';
import MarkerPin from '~/public/images/drawer/marker-pin-01.svg';
import CreditCard from '~/public/images/drawer/credit-card-02.svg';
import Phone from '~/public/images/drawer/phone.svg';
import Chat from '~/public/images/drawer/message-chat-square.svg';
import Settings from '~/public/images/drawer/settings-01.svg';
import LogOut from '~/public/images/drawer/log-out-02.svg';
export default function DrawerContent({ navigation }: { navigation: DrawerNavigation }) {
  const { top } = useSafeAreaInsets();
  //   const navigation = useNavigation<DrawerNavigation>();
  //   console.log(navigation, 'props');
  console.log(navigation, 'navigation');
  return (
    <YStack bg="white">
      <YStack bg="#FD4F01" pt={top} borderBottomLeftRadius={20} borderBottomRightRadius={20}>
        <YStack p="$4">
          <XStack gap="$3">
            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
              <Feather name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <YStack gap="$1">
              <Text color="white" fontSize={20} fontWeight={700}>
                User Name
              </Text>
              <Text color="white" fontSize={16} fontWeight={500}>
                username@gmail.com
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
      <SafeAreaView edges={['bottom']}>
        <ScrollView py={40} px={16}>
          <YStack gap={20}>
            {drawerList.map((item, index) => (
              <TouchableOpacity key={index}>
                <XStack justifyContent="space-between">
                  <XStack gap={10}>
                    <item.icon />
                    <Text>{item.name}</Text>
                  </XStack>

                  <Text>df</Text>
                </XStack>
              </TouchableOpacity>
            ))}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}

const drawerList = [
  {
    name: 'My Profile',
    icon: User,
  },
  {
    name: 'Manage Subscription',
    icon: Group,
  },
  {
    name: 'My Orders',
    icon: ShoppingCart,
  },
  {
    name: 'Addresses',
    icon: MarkerPin,
  },
  {
    name: 'Payment Methods',
    icon: CreditCard,
  },
  {
    name: 'Contact Us',
    icon: Phone,
  },
  {
    name: 'FAQs',
    icon: Chat,
  },
  {
    name: 'Settings',
    icon: Settings,
  },
  {
    name: 'Log Out',
    icon: LogOut,
  },
];
