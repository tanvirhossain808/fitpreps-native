import { Link, RelativePathString, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import HomeInActive from 'public/images/tracking/tabs/homeInactive.svg';
import Logo from 'public/images/tracking/tabs/logo.svg';
import Workout from 'public/images/tracking/tabs/workouts.svg';
import User from 'public/images/tracking/tabs/user.svg';
import { HeaderButton } from '~/components/HeaderButton';
import { tabBarStyles } from '~/constant';

const tabConfig = [
  {
    name: 'index',
    title: 'Home',
    icon: HomeInActive,
    showTab: true,
    href: '(navigator)/(tabs)',
  },
  {
    name: 'log',
    title: 'Log',
    icon: Logo,
    showTab: true,
    href: '/log',
  },
  {
    name: 'workout',
    title: 'Workout',
    icon: Workout,
    showTab: true,
    href: '/workout',
  },
  {
    name: 'personal-data',
    title: 'Personal Data',
    icon: User,
    showTab: true,
    href: 'personal-data',
  },
  {
    name: 'add-food-cals',
    title: 'Add Food Cals',
    icon: () => {},
    showTab: false,
    href: null,
  },
  {
    name: 'train-workout',
    title: 'Train Workout',
    icon: () => {},
    showTab: false,
    href: null,
  },
  {
    name: 'log-workout',
    title: 'Log Workout',
    icon: () => {},
    showTab: false,
    href: null,
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          ...tabBarStyles.tabBarStyle,
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
            href: tab.href as RelativePathString | null,
            headerShown: false,
            tabBarStyle: tab.showTab ? { ...tabBarStyles.tabBarStyle } : { display: 'none' },
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
