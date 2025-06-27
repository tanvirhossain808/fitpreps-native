import { AntDesign } from '@expo/vector-icons';
import { AnimatePresence, Button, Dialog, Text, XStack, YStack } from 'tamagui';

export default function DeleteConfirmationDialog({
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
