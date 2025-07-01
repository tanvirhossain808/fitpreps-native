import { Link, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';

import { HeaderButton } from '~/components/HeaderButton';
import { Image } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeInActive from 'public/images/tracking/tabs/homeInactive.svg';
import Logo from 'public/images/tracking/tabs/logo.svg';
import Workout from 'public/images/tracking/tabs/workouts.svg';
import User from 'public/images/tracking/tabs/user.svg';
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
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <HomeInActive />
            ) : (
              <HomeInActive style={{ color: focused ? '#FD4F01' : '#8E95A2' }} />
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
        name="log"
        options={{
          headerShown: false,
          title: 'Log',
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Logo />
            ) : (
              <Logo style={{ color: focused ? '#FD4F01' : '#8E95A2' }} />
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
        name="workout"
        options={{
          title: 'workout',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <Workout />
            ) : (
              <Workout style={{ color: focused ? '#FD4F01' : '#8E95A2' }} />
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
        name="personal-data"
        options={{
          headerShown: false,
          title: 'Personal Data',
          tabBarIcon: ({ color, focused }) => {
            return !focused ? (
              <User />
            ) : (
              <User style={{ color: focused ? '#FD4F01' : '#8E95A2' }} />
            );
          },
        }}
      />
    </Tabs>
  );
}
