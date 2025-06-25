import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, YStack, Dialog, XStack, Paragraph } from 'tamagui';
import { useState } from 'react';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function CancelSubscription() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCancelSubscription = () => {
    setIsOpen(() => false);
    router.push({
      pathname: '/subscriptionQuit',
      params: {
        type: 'paused',
      },
    });
  };
  return (
    <YStack flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerPageHeader title="Pause Subscription" />
        <YStack px={'$4'} py={60} flex={1} gap="$7">
          <Text fontSize={16} color="black" fontWeight={500} textAlign="center">
            As you are on weekly subscription, you can pause it 4 times in a year. The subscription
            will start the week after you pause it.
          </Text>
          <Button
            color="white"
            fontWeight={700}
            fontSize={16}
            px="$5"
            bg="#FD4F01"
            shadowColor="rgba(10, 13, 18, 0.05)"
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={1}
            shadowRadius={2}
            onPress={() => setIsOpen(true)}>
            Pause Subscription
          </Button>
        </YStack>
      </SafeAreaView>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay animation="quick" opacity={0.5} backgroundColor="$background" />
            <Dialog.Content
              px="$5"
              key="cancel-dialog"
              animation="bouncy"
              bg="$backgroundTransparent">
              <YStack
                p="$5"
                gap="$5"
                bg="white"
                borderRadius={12}
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowOffset={{ width: 1, height: 2 }}
                shadowOpacity={1}
                shadowRadius={4}>
                <XStack alignItems="center" justifyContent="space-between">
                  <Text color="#1E1F20" fontSize={20} fontWeight={700}>
                    Pause Subscription?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <AntDesign name="close" size={24} color="#1E1F20" />
                  </TouchableOpacity>
                </XStack>
                <Text color="#1E1F20" fontWeight={500} fontSize={16}>
                  As you are on weekly subscription, you can pause it 4 times in a year. The
                  subscription will start the week after you pause it.
                </Text>
                <XStack width="100%" justifyContent="space-between">
                  <Button
                    borderWidth={1}
                    borderColor="#FD4F01"
                    height={43}
                    color="#FD4F01"
                    fontSize={16}
                    fontWeight={700}
                    bg="$backgroundTransparent"
                    width="48%"
                    shadowColor="rgba(10, 13, 18, 0.05)"
                    shadowOffset={{ width: 0, height: 1 }}
                    shadowOpacity={1}
                    shadowRadius={2}
                    onPress={() => setIsOpen(false)}>
                    No
                  </Button>
                  <Button
                    height={43}
                    width="48%"
                    color="white"
                    bg="#FD4F01"
                    shadowColor="rgba(10, 13, 18, 0.05)"
                    shadowOffset={{ width: 0, height: 1 }}
                    shadowOpacity={1}
                    shadowRadius={2}
                    onPress={handleCancelSubscription}>
                    Yes
                  </Button>
                </XStack>
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </YStack>
  );
}
