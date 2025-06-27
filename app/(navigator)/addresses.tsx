import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import Entypo from '@expo/vector-icons/Entypo';
export default function addresses() {
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="Addresses" />
        <YStack f={1} justifyContent="space-between" gap="$4">
          <YStack px="$4" py="$5">
            <YStack>
              <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                Saved Address
              </Text>
            </YStack>
            <YStack mb={100}>
              <ScrollView space={'$5'} showsVerticalScrollIndicator={false}>
                {savedAddress.map((address, i) => (
                  <YStack key={i} p="$3" borderRadius={12} bg="#FFF9F7">
                    <XStack alignItems="center" justifyContent="space-between">
                      <XStack gap="$1" alignItems="center">
                        <Text fontSize={16} color="#1E1F20" fontWeight={700}>
                          {address.name}
                        </Text>
                        {address.status && (
                          <XStack p={8} borderRadius={20} bg="#E5F8EA">
                            <Text color="#009A21" fontWeight={700} fontSize={10}>
                              {address.status}
                            </Text>
                          </XStack>
                        )}
                      </XStack>
                      <TouchableOpacity>
                        <Entypo name="dots-three-horizontal" size={24} color="#FD4F01" />
                      </TouchableOpacity>
                    </XStack>
                    <Text fontSize={16}>{address.location}</Text>
                  </YStack>
                ))}
              </ScrollView>
            </YStack>
          </YStack>
          <XStack
            px="$4"
            py="$5"
            flex={1}
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="white">
            <Button
              color="#FD4F01"
              fontSize={16}
              fontWeight={700}
              bg="white"
              borderWidth={1}
              borderColor="#FD4F01"
              flex={1}>
              Add New Address
            </Button>
          </XStack>
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

const savedAddress = [
  {
    status: 'Default',
    name: 'Home',
    location: 'Street name, Block no., Locality, City Name, State - 000000.',
  },
  {
    status: '',
    name: 'Work',
    location: 'Street name, Block no., Locality, City Name, State - 000000.',
  },
  {
    status: '',
    name: 'Fam',
    location: 'Street name, Block no., Locality, City Name, State - 000000.',
  },
  {
    status: '',
    name: 'Other',
    location: 'Street name, Block no., Locality, City Name, State - 000000.',
  },
];
