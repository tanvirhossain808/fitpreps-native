import { Link, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Image } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 20,
          paddingHorizontal: 28,
          height: 68,
          paddingTop: 12,
          elevation: 7,
          shadowColor: '#B6BAC3',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            tint="light"
            style={{
              flex: 1,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
        ),
      }}>
      <Tabs.Screen
        name="meals"
        options={{
          headerShown: false,
          title: 'Meals',
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Image source={require('public/images/meals.png')} width={28} height={28} />
            ) : (
              <Image source={require('public/images/focusedmeals.png')} width={28} height={28} />
            );
          },
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: 'Subscription',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Image source={require('public/images/subs.png')} width={20} height={22} />
            ) : (
              <Image
                source={require('public/images/focuesSubscription.png')}
                width={20}
                height={22}
              />
            );
          },
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Image source={require('public/images/home.png')} width={28} height={28} />
            ) : (
              <Image source={require('public/images/fhome.png')} width={28} height={28} />
            );
          },
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          headerShown: false,
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Image source={require('public/images/shop.png')} width={28} height={28} />
            ) : (
              <Image source={require('public/images/fshop.png')} width={28} height={28} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="track"
        options={{
          title: 'Track',
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Image source={require('public/images/track.png')} width={20} height={20} />
            ) : (
              <Image source={require('public/images/fshop.png')} width={20} height={20} />
            );
          },
        }}
      />
    </Tabs>
  );
}
