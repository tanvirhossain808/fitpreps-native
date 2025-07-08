import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { DrawerNavigation } from '~/src/types/navigation';
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
import { AppRoute } from '~/src/types/type';
import LogOutPopUp from '../Logout/LogOutPopUp';

export default function DrawerContent({ navigation }: { navigation: DrawerNavigation }) {
  const { top } = useSafeAreaInsets();
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [showLogOutPopUp, setShowLogOutPopUp] = useState(false);
  const handleNavigation = (route: string, name?: string) => {
    if (name === 'Log Out') {
      setShowLogOutPopUp(true);
      return;
    }
    setActiveRoute(route);
    router.push(route as AppRoute);
  };
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
          <YStack gap={12}>
            {drawerList.map((item, index) => (
              <View
                key={index}
                px={14}
                py={10}
                borderRadius={8}
                bg="#FAFAFB"
                elevationAndroid={1}
                shadowColor="rgba(10, 13, 18, 0.10)"
                shadowRadius={2}
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={1}>
                <TouchableOpacity onPress={() => handleNavigation(item.path, item.name)}>
                  <XStack justifyContent="space-between">
                    <XStack gap={10}>
                      <item.icon />
                      <Text fontSize={16} fontWeight={500}>
                        {item.name}
                      </Text>
                    </XStack>

                    <Feather name="chevron-right" size={20} color="black" />
                  </XStack>
                </TouchableOpacity>
              </View>
            ))}
          </YStack>
        </ScrollView>
      </SafeAreaView>
      <LogOutPopUp open={showLogOutPopUp} onOpenChange={setShowLogOutPopUp} />
    </YStack>
  );
}

const drawerList = [
  {
    name: 'My Profile',
    icon: User,
    path: '/(navigator)/my-profile',
  },
  {
    name: 'Manage Subscription',
    icon: Group,
    path: '/(navigator)/manage-subscription',
  },
  {
    name: 'My Orders',
    icon: ShoppingCart,
    path: '/(navigator)/orders',
  },
  {
    name: 'Addresses',
    icon: MarkerPin,
    path: '/(navigator)/addresses',
  },
  {
    name: 'Payment Methods',
    icon: CreditCard,
    path: '/(navigator)/payment-methods',
  },
  {
    name: 'Contact Us',
    icon: Phone,
    path: '/(navigator)/contact-us',
  },
  {
    name: 'FAQs',
    icon: Chat,
    path: '/(navigator)/faqs',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/(navigator)/settings',
  },
  {
    name: 'Log Out',
    icon: LogOut,
    path: '/(navigator)/logout',
  },
];
