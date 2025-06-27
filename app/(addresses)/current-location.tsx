import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, YStack, ScrollView, Input, XStack, Image, Button } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import { shadows } from '~/constant';

export default function CurrentLocation() {
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="Select Delivery Location" />
        <YStack flex={1}>
          <ScrollView
            flex={1}
            contentContainerStyle={{
              ...style.containerStyle,
            }}>
            <YStack px="$4" py="$5" gap="$7">
              <XStack
                width={'100%'}
                shadowColor="rgba(10, 13, 18, 0.05)"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={1}
                shadowRadius={2}
                elevation={1}
                backgroundColor="white"
                borderColor="#EDEEF1"
                borderWidth={1}
                alignItems="center"
                gap="$2"
                px={14}
                justifyContent="space-between"
                borderRadius={8}>
                <Input
                  flex={1}
                  width="100%"
                  py={10}
                  px={0}
                  backgroundColor="white"
                  borderWidth={0}
                  outlineWidth={0}
                  placeholder="Search for a street or area"
                  placeholderTextColor="#8E95A2"
                  fontSize={14}
                />
                <Feather name="search" size={20} color="#181D27" />
              </XStack>
              <Image
                source={require('public/images/map.png')}
                w="100%"
                height={437}
                borderRadius={12}
              />
            </YStack>
            <YStack py="$5" px="$4" mt="$4">
              <Text color="#1E1F20" fontWeight={700} fontSize={16}>
                ABC Apartments
              </Text>
              <Text mt="$2" color="#1E1F20" fontSize={16}>
                Street name, Block no., Locality, City Name, State - 000000.
              </Text>
              <Button
                onPress={() =>
                  router.push({
                    pathname: '/(addresses)/new-address',
                    params: {},
                  })
                }
                {...shadows.small}
                fontSize={16}
                fontWeight={700}
                bg="#FD4F01"
                color="white"
                mt="$3">
                Confirm Location
              </Button>
            </YStack>
          </ScrollView>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});
