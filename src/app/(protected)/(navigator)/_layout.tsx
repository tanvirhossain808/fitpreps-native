import { Drawer } from 'expo-router/drawer';
import DrawerContent from '~/src/components/drawer/DrawerContent';

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
      {/* <Drawer.Screen
        name="index"
        options={{
          //   headerShown: false,
          drawerLabel: 'Home',
          title: 'overview',
        }}
      /> */}

      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'User',
          title: 'overview',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="(tracking)"
        options={{
          drawerLabel: 'User',
          title: 'overview',
          headerShown: false,
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
          drawerLabel: 'My Orders',
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
          drawerLabel: 'Addresses',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="payment-methods"
        options={{
          drawerLabel: 'Payment Methods',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="contact-us"
        options={{
          drawerLabel: 'Contact Us',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="faqs"
        options={{
          drawerLabel: 'FAQs',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          headerShown: false,
          title: 'overview',
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
    </Drawer>
  );
}
