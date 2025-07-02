import { Link, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import HomeInActive from 'public/images/tracking/tabs/homeInactive.svg';
import Logo from 'public/images/tracking/tabs/logo.svg';
import Workout from 'public/images/tracking/tabs/workouts.svg';
import User from 'public/images/tracking/tabs/user.svg';
import { HeaderButton } from '~/components/HeaderButton';

const tabConfig = [
  {
    name: 'index',
    title: 'Home',
    icon: HomeInActive,
  },
  {
    name: 'log',
    title: 'Log',
    icon: Logo,
  },
  {
    name: 'workout',
    title: 'Workout',
    icon: Workout,
  },
  {
    name: 'personal-data',
    title: 'Personal Data',
    icon: User,
  },
];

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
      {tabConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <tab.icon
                style={{
                  color: focused ? '#FD4F01' : '#8E95A2',
                }}
              />
            ),
            headerRight:
              tab.name !== 'personal-data'
                ? () => (
                    <Link href="/modal" asChild>
                      <HeaderButton />
                    </Link>
                  )
                : undefined,
          }}
        />
      ))}
    </Tabs>
  );
}
