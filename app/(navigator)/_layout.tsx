import { Drawer } from 'expo-router/drawer';
import DrawerContent from '~/components/drawer/DrawerContent';

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'right',
        drawerStyle: {
          width: '100%',
        },
        // drawerContent: () => <DrawerContent />,
      }}
      drawerContent={(props: any) => {
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name="index"
        options={{
          //   headerShown: false,
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="my-profile"
        options={{
          drawerLabel: 'My Profile',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="manage-subscription"
        options={{
          drawerLabel: 'Manage Subscription',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: 'Orders',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="addresses"
        options={{
          drawerLabel: 'Orders',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'User',
          title: 'overview',
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
