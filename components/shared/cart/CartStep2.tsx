import { View, Text, Button, YStack, XStack, Popover, Dialog, AnimatePresence } from 'tamagui';
import React, { useState } from 'react';
import { address } from '~/constant';
import { TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export default function CartStep2({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(true);
  const handleDelete = (index: number) => {
    setSelectedAddress(null);
    setIsDeleteDialogOpen(true);
  };
  const handleEdit = (index: number) => {
    setSelectedAddress(null);
    // Add your edit logic here
  };
  const PopoverContent = ({ index }: { index: number }) => (
    <Popover.Content
      overflow="hidden"
      borderWidth={1}
      borderColor="#B6BAC3"
      bg="white"
      p={0}
      borderRadius={8}
      enterStyle={{ y: -5, opacity: 0 }}
      exitStyle={{ y: -5, opacity: 0 }}
      shadowColor="rgba(0, 0, 0, 0.15)"
      shadowOffset={{ width: 0, height: 4 }}
      shadowRadius={8}
      shadowOpacity={1}
      elevation={2}
      padding={0}
      margin={0}
      minWidth={120}>
      <YStack width="100%">
        <Pressable
          onPress={() => handleEdit(index)}
          onPressIn={() => setPressedItem('edit')}
          onPressOut={() => setPressedItem(null)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#FFEDE5' : 'transparent',
            padding: 12,
            borderWidth: 0,
            alignItems: 'center',
          })}>
          <Text color="#1E1F20" fontSize={14} fontWeight={500}>
            Edit
          </Text>
        </Pressable>

        <View height={1} backgroundColor="#F0F0F0" width="100%" />

        <Pressable
          onPress={() => handleDelete(index)}
          onPressIn={() => setPressedItem('delete')}
          onPressOut={() => setPressedItem(null)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? '#FFEDE5' : 'transparent',
            padding: 12,
            borderWidth: 0,
            alignItems: 'center',
          })}>
          <Text color="#1E1F20" fontSize={14} fontWeight={500}>
            Remove
          </Text>
        </Pressable>
      </YStack>
    </Popover.Content>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <YStack flex={1} justifyContent="space-between">
          <YStack flex={1} px={'$4'} pb="$5" gap="$7">
            <Button
              width="100%"
              fontSize={16}
              color="#FD4F01"
              fontWeight={700}
              borderRadius={8}
              borderWidth={1}
              borderColor="#FD4F01"
              backgroundColor="white"
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOffset={{ width: 0, height: 1 }}
              shadowRadius={2}
              shadowOpacity={1}
              elevation={2}>
              Add New Address
            </Button>
            <YStack gap="$3">
              <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                Saved Address
              </Text>

              {address.map((addressDetails, i) => (
                <TouchableOpacity key={i} onPress={() => setSelectedIndex(i)} activeOpacity={0.4}>
                  <XStack p="$3" gap="$3" borderRadius={12} bg="#FFF9F7" alignItems="flex-start">
                    <XStack
                      mt="8"
                      alignItems="center"
                      justifyContent="center"
                      width={14}
                      height={14}
                      borderRadius={50}
                      borderWidth={1}
                      borderColor="#FD4F01">
                      <View
                        backgroundColor={selectedIndex === i ? '#FD4F01' : 'transparent'}
                        width={10}
                        height={10}
                        borderRadius={selectedIndex === i ? 50 : 0}
                      />
                    </XStack>
                    <YStack flex={1} alignSelf="stretch">
                      <XStack justifyContent="space-between" alignItems="flex-start">
                        <XStack gap={4} alignItems="center" flex={1} mr="$2">
                          <Text color="#1E1F20" fontSize={16} fontWeight={700} numberOfLines={1}>
                            {addressDetails.name}
                          </Text>
                          <Text
                            color="#009A21"
                            fontSize={10}
                            fontWeight={700}
                            p="$2"
                            bg="#E5F8EA"
                            borderRadius={20}>
                            {addressDetails.badge}
                          </Text>
                        </XStack>
                        <Popover
                          open={selectedAddress === i}
                          onOpenChange={(open) => setSelectedAddress(open ? i : null)}
                          placement="left-start"
                          offset={{ mainAxis: -25, crossAxis: 20 }}>
                          <Popover.Trigger asChild>
                            <TouchableOpacity
                              onPress={(e) => {
                                e.stopPropagation();
                                setSelectedAddress(selectedAddress === i ? null : i);
                              }}
                              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                              <Entypo name="dots-three-horizontal" size={24} color="#FD4F01" />
                            </TouchableOpacity>
                          </Popover.Trigger>
                          <PopoverContent index={i} />
                        </Popover>
                      </XStack>
                      <Text fontSize={14} marginTop={4}>
                        {addressDetails.streetName}
                      </Text>
                    </YStack>
                  </XStack>
                </TouchableOpacity>
              ))}
            </YStack>
          </YStack>
          <XStack alignItems="center" px={'$4'} py="$5">
            <Button
              disabled={selectedIndex === null}
              flex={1}
              mt="$3"
              bg="#FD4F01"
              borderRadius={8}
              fontSize={16}
              fontWeight={700}
              color="white"
              onPress={() => setCurrentStep(2)}>
              Confirm
            </Button>
          </XStack>
        </YStack>
      </SafeAreaView>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          // Handle delete logic here
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}

function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="quick"
              opacity={1}
              backgroundColor="rgba(0, 0, 0, 0.20)"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              bordered
              elevate
              key="content"
              animation={[
                'quick',
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
              onPointerDownOutside={() => onOpenChange(false)}
              onEscapeKeyDown={() => onOpenChange(false)}
              space
              p="0"
              borderRadius="$4"
              maxWidth={400}
              w={340}>
              {/* Rest of your dialog content remains the same */}
              <YStack p="$5" gap="$5">
                <XStack justifyContent="space-between" alignItems="center" mb="$4">
                  <Text fontSize={20} fontWeight="700">
                    Remove Address?
                  </Text>
                  <Button
                    circular
                    icon={<AntDesign name="close" size={24} color="#1E1F20" />}
                    onPress={() => onOpenChange(false)}
                    unstyled
                  />
                </XStack>

                <YStack>
                  <Text fontSize={16} fontWeight="500" color="#1E1F20">
                    Once you remove this address it will not show during checkout.
                  </Text>
                </YStack>

                <XStack gap="$3" justifyContent="space-between">
                  <Button
                    flex={1}
                    alignSelf="stretch"
                    onPress={() => onOpenChange(false)}
                    borderWidth={1}
                    borderColor="#FD4F01"
                    color="#FD4F01"
                    backgroundColor="transparent"
                    fontSize={16}
                    fontWeight="700"
                    px="$4"
                    py="$2">
                    Cancel
                  </Button>
                  <Button
                    onPress={onConfirm}
                    backgroundColor="#FD4F01"
                    color="white"
                    fontSize={16}
                    fontWeight="600"
                    hoverStyle={{ backgroundColor: '#DC2626' }}>
                    Yes, Remove
                  </Button>
                </XStack>
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
