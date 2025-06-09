import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { Image } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarStyle: {
            // position: 'absolute',
            // bottom: 16,
            // left: 16,
            // right: 16,
            borderRadius: 20,
            paddingHorizontal: 28,
            height: 68,
            paddingTop: 12,
            backgroundColor: '#fffefd',
            elevation: 7,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
        }}>
        <Tabs.Screen
          name="meals"
          options={{
            title: 'Meals',
            tabBarIcon: ({ color, focused }) => {
              console.log(focused, 'focused');
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
            tabBarIcon: ({ color, focused }) => {
              console.log(focused, 'focused');
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
              console.log(focused, 'focused');
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
            title: 'Shop',
            tabBarIcon: ({ color, focused }) => {
              console.log(focused, 'focused');
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
              console.log(focused, 'focused');
              return !focused ? (
                <Image source={require('public/images/track.png')} width={20} height={20} />
              ) : (
                <Image source={require('public/images/fshop.png')} width={20} height={20} />
              );
            },
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
