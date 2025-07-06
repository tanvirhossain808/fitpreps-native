import { AnimatePresence, Button, Dialog, Text, XStack, YStack } from 'tamagui';
import { shadows } from '~/constant';

export default function LogOutPopUp({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
              enterStyle={{ y: -20, opacity: 0, scale: 0.3 }}
              exitStyle={{ y: 10, opacity: 0, scale: 0.2 }}
              onPointerDownOutside={() => onOpenChange(false)}
              onEscapeKeyDown={() => onOpenChange(false)}
              p="0"
              focusStyle={{
                outlineWidth: 0,
              }}
              borderRadius="$4"
              maxWidth={400}
              borderWidth={0}
              outlineWidth={0}
              w={340}>
              <YStack
                p={'$5'}
                gap="$5"
                bg="white"
                borderRadius={12}
                elevationAndroid={1.5}
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowRadius={4}
                shadowOffset={{ width: 1, height: 2 }}>
                <Text textAlign="center" w="100%" color="#1E1F20" fontSize={16} fontWeight={700}>
                  Are you sure you want to log out?
                </Text>
                <XStack gap="$5">
                  <Button
                    onPress={() => onOpenChange(false)}
                    borderWidth={1}
                    borderColor="#FD4F01"
                    bg="white"
                    color="#FD4F01"
                    fontSize={16}
                    fontWeight="700"
                    w={'100%'}
                    f={1}
                    {...shadows.small}
                    flexShrink={1}
                    hoverStyle={{ backgroundColor: '#DC2626' }}>
                    Cancel
                  </Button>
                  <Button
                    onPress={() => onOpenChange(false)}
                    {...shadows.small}
                    backgroundColor="#FD4F01"
                    fontWeight="700"
                    color="white"
                    w={'100%'}
                    f={1}
                    flexShrink={1}
                    hoverStyle={{ backgroundColor: '#DC2626' }}>
                    Log Out
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
