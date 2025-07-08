import { StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, Text, XStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Phone from 'public/images/phone.svg';
import Location from 'public/images/contacat/marker-pin-01.svg';
import Insta from 'public/images/contacat/insta.svg';
import { createElement } from 'react';
import * as WebBrowser from 'expo-web-browser';

export default function ContactUs() {
  const handleContactPress = async (type: string, value: string) => {
    try {
      switch (type) {
        case 'email':
          await Linking.openURL(`mailto:${value}`);
          break;
        case 'phone':
          await Linking.openURL(`tel:${value.replace(/\s+/g, '')}`);
          break;
        case 'instagram':
          const instagramUrl = `https://www.instagram.com/${value.replace('@', '')}`;
          const supported = await Linking.canOpenURL(instagramUrl);
          if (supported) {
            await Linking.openURL(instagramUrl);
          } else {
            await WebBrowser.openBrowserAsync(instagramUrl);
          }
          break;
        case 'address':
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
          await WebBrowser.openBrowserAsync(mapsUrl);
          break;
      }
    } catch (error) {
      console.error('Error opening link:', error);
      Alert.alert('Error', 'Could not open the requested application.');
    }
  };

  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={{ ...style.container }}>
        <DrawerPageHeader title="Contact Us" />
        <YStack f={1} px={16} py="$5" gap={32}>
          {contactUsList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleContactPress(item.type, item.value)}>
              <XStack gap="$1" w="100%" alignSelf="stretch">
                {item.icon()}
                <YStack flex={1} gap="$2" flexWrap="wrap">
                  <Text fontSize={16} fontWeight={700} color="#1E1F20">
                    {item.name}
                  </Text>
                  <Text w="100%" fontSize={16} textWrap="wrap" fontWeight={400} color="#1E1F20">
                    {item.value}
                  </Text>
                </YStack>
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const contactUsList = [
  {
    name: 'Email',
    icon: () => createElement(Location, { width: 20, height: 20 }),
    path: '/(navigator)/contact-us',
    type: 'email',
    value: 'fitpreps@gmail.com',
  },
  {
    name: 'Address',
    icon: () => createElement(Location, { width: 20, height: 20 }),
    path: '/(navigator)/contact-us',
    type: 'address',
    value: 'Textielweg 19, 3812RV Amersfoort, Nederland',
  },
  {
    name: 'Phone',
    icon: () => createElement(Phone, { width: 20, height: 20 }),
    path: '/(navigator)/contact-us',
    type: 'phone',
    value: '+31 6 29 50 03 01',
  },
  {
    name: 'Instagram',
    icon: () => createElement(Insta, { width: 24, height: 24 }),
    path: '/(navigator)/contact-us',
    type: 'instagram',
    value: '@fitpreps.nl',
  },
];
