import { Link, Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { HeaderButton } from '../../components/HeaderButton';
import { Image } from 'tamagui';

const tabConfigs = [
  {
    name: 'meals',
    title: 'Meals',
    icon: require('public/images/meals.png'),
    focusedIcon: require('public/images/focusedmeals.png'),
    width: 28,
    height: 28,
  },
  {
    name: 'subscription',
    title: 'Subscription',
    icon: require('public/images/subs.png'),
    focusedIcon: require('public/images/focuesSubscription.png'),
    width: 20,
    height: 22,
  },
  {
    name: 'index',
    title: 'Home',
    icon: require('public/images/home.png'),
    focusedIcon: require('public/images/fhome.png'),
    width: 28,
    height: 28,
  },
  {
    name: 'shop',
    title: 'Shop',
    icon: require('public/images/shop.png'),
    focusedIcon: require('public/images/fshop.png'),
    width: 28,
    height: 28,
  },
  {
    name: 'track',
    title: 'Track',
    icon: require('public/images/track.png'),
    focusedIcon: require('public/images/fshop.png'),
    width: 20,
    height: 20,
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
      {tabConfigs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? tab.focusedIcon : tab.icon}
                width={tab.width}
                height={tab.height}
              />
            ),
            ...(tab.name !== 'shop' &&
              tab.name !== 'track' && {
                headerRight: () => (
                  <Link href="/modal" asChild>
                    <HeaderButton />
                  </Link>
                ),
              }),
          }}
        />
      ))}
    </Tabs>
  );
}
