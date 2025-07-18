import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Popover, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import DeleteConfirmationDialog from '~/src/components/addresses/DeleteConfirmationDialog';
import { router } from 'expo-router';

export default function Addresses() {
  const [isPressEdit, setIsPressEdit] = useState(false);
  const [isPressDelete, setIsPressDelete] = useState(false);
  const [openPopUpcontent, setOpenPopUpContent] = useState<null | number>(null);
  const [showRemoveAddressModal, setRemoveAddressModal] = useState(false);
  const handleDeleteAddress = () => {
    setRemoveAddressModal(true);
    setOpenPopUpContent(null);
    setIsPressDelete(false);
  };
  return (
    <YStack f={1} bg="white" onPress={() => setOpenPopUpContent(null)}>
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
              <ScrollView space={'$5'} showsVerticalScrollIndicator={false} overflow="visible">
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
                      <XStack>
                        <TouchableOpacity onPress={() => setOpenPopUpContent(i)}>
                          <Entypo name="dots-three-horizontal" size={24} color="#FD4F01" />
                        </TouchableOpacity>
                      </XStack>
                    </XStack>
                    {openPopUpcontent === i && (
                      <YStack
                        borderWidth={1}
                        borderColor="#B6BAC3"
                        borderRadius={12}
                        bg="white"
                        zIndex={1}
                        position="absolute"
                        right={40}
                        top={30}>
                        <Pressable
                          style={{
                            ...style.popOver,
                            backgroundColor: isPressEdit ? '#FFEDE5' : 'transparent',
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                          }}
                          onPressIn={() => setIsPressEdit(true)}
                          onPressOut={() => setIsPressEdit(false)}
                          onPress={() =>
                            router.push({
                              pathname: '/(addresses)/edit-address',
                              params: {},
                            })
                          }>
                          <Text fontSize={14} fontWeight={500} color="#1E1F20">
                            Edit
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={handleDeleteAddress}
                          style={{
                            ...style.popOver,
                            backgroundColor: isPressDelete ? '#FFEDE5' : 'transparent',
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                          }}
                          onPressIn={() => setIsPressDelete(true)}
                          onPressOut={() => setIsPressDelete(false)}>
                          <Text fontSize={14} fontWeight={500} color="#1E1F20">
                            Remove
                          </Text>
                        </Pressable>
                      </YStack>
                    )}

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
              flex={1}
              onPress={() =>
                router.push({
                  pathname: '/(addresses)/new-address',
                  params: {},
                })
              }>
              Add New Address
            </Button>
          </XStack>
        </YStack>
      </SafeAreaView>
      {showRemoveAddressModal && (
        <DeleteConfirmationDialog
          open={showRemoveAddressModal}
          onOpenChange={setRemoveAddressModal}
          onConfirm={() => {
            setRemoveAddressModal(false);
            setOpenPopUpContent(null);
          }}
          onCancel={() => {
            setRemoveAddressModal(false);
            setOpenPopUpContent(null);
          }}
        />
      )}
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  popOver: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
