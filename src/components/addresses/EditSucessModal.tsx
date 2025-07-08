import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { AnimatePresence, Dialog, Text, View } from 'tamagui';

export default function EditSuccess({
  open,

  onOpenChange,
  setIsEditAddress,
  setConFirmAddress,
  setIsAddressModalOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsEditAddress: (isEditAddress: boolean) => void;
  setConFirmAddress: (confirmAddress: boolean) => void;
  setIsAddressModalOpen: (addressModalOpen: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay
              pointerEvents="auto"
              onPress={() => onOpenChange(false)}
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
              <View
                p={'$5'}
                bg="white"
                borderRadius={12}
                elevationAndroid={1.5}
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowRadius={4}
                shadowOffset={{ width: 1, height: 2 }}>
                <Text textAlign="center" w="100%" color="#009A21" fontSize={24} fontWeight={700}>
                  Awesome!
                </Text>
                <TouchableOpacity
                  style={{ position: 'absolute', right: 20, top: 20 }}
                  onPress={() => {
                    onOpenChange(false);
                    setIsEditAddress(false);
                    setIsAddressModalOpen(false);
                    setConFirmAddress(true);
                    // onOpenChange(false);
                    if (setIsEditAddress) {
                      setIsEditAddress(false);

                      // setConFirmAddress(false);
                    }
                  }}>
                  <AntDesign name="close" size={24} color="#1E1F20" />
                </TouchableOpacity>

                <Text mt={12} color="#1E1F20" fontWeight={500}>
                  You have successfully edited your address.
                </Text>
              </View>

              {/* Rest of your dialog content remains the same */}
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
