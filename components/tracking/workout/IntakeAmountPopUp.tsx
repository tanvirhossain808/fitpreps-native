import { TouchableOpacity } from 'react-native';
import {
  Adapt,
  AnimatePresence,
  Button,
  Dialog,
  Input,
  Select,
  Sheet,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { shadows } from '~/constant';
import Cancel from '~/public/images/cancel.svg';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import CircleBroken from '~/public/images/check-circle-broken.svg';
export default function IntakeAmountPopUp({
  open,
  onOpenChange,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
}) {
  const [unit, setUnit] = useState('L');
  const [inTakeAdded, setInTakeAdded] = useState(false);
  const units = ['L', 'ml', 'oz'];

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
              {!inTakeAdded ? (
                <YStack
                  height={150}
                  p={'$5'}
                  gap="$3"
                  bg="white"
                  borderRadius={12}
                  elevationAndroid={1.5}
                  shadowColor="rgba(0, 0, 0, 0.15)"
                  shadowRadius={4}
                  shadowOffset={{ width: 1, height: 2 }}>
                  <XStack
                    // f={1}
                    w="100%"
                    borderBottomWidth={1}
                    borderBottomColor="#D8DBDF"
                    py={8}
                    alignItems="center"
                    justifyContent="space-between">
                    <Text fontSize={16} fontWeight={700}>
                      {type} intake
                    </Text>
                    <TouchableOpacity onPress={() => onOpenChange(false)}>
                      <Cancel />
                    </TouchableOpacity>
                  </XStack>
                  <XStack gap="$3" f={1}>
                    <XStack
                      f={1}
                      justifyContent="space-between"
                      // f={1}
                      // height={41}
                      gap="$2"
                      borderRadius={12}
                      borderColor="#EDEEF1"
                      overflow="hidden"
                      borderWidth={1}
                      // f={1}
                      pl={16}>
                      <Input
                        f={1}
                        py={12}
                        boxShadow="none"
                        bg="transparent"
                        borderWidth={0}
                        placeholder="0000"
                        outlineWidth={0}
                        p={0}
                        h="auto"
                      />
                      <XStack gap={4} bg="#E8EFFF" alignItems="center">
                        <Select value={unit} onValueChange={setUnit} disablePreventBodyScroll>
                          <Select.Trigger
                            width={61}
                            height="100%"
                            bg="#E8EFFF"
                            borderWidth={0}
                            borderLeftWidth={1}
                            borderColor="#EDEEF1"
                            borderRadius={0}>
                            <XStack alignItems="center" gap={4}>
                              <Text fontSize={14} fontWeight={700}>
                                {unit}
                              </Text>
                              <Feather name="chevron-down" size={16} color="black" />
                            </XStack>
                          </Select.Trigger>

                          <Adapt when="sm" platform="touch">
                            <Sheet native={false} modal dismissOnSnapToBottom>
                              <Sheet.Frame>
                                <Sheet.ScrollView>
                                  <Adapt.Contents />
                                </Sheet.ScrollView>
                              </Sheet.Frame>
                              <Sheet.Overlay
                                animation="lazy"
                                enterStyle={{ opacity: 0 }}
                                exitStyle={{ opacity: 0 }}
                              />
                            </Sheet>
                          </Adapt>

                          <Select.Content>
                            <Select.Viewport>
                              <Select.Group>
                                {units.map((u, i) => (
                                  <Select.Item index={i} key={u} value={u}>
                                    <Select.ItemText>{u}</Select.ItemText>
                                  </Select.Item>
                                ))}
                              </Select.Group>
                            </Select.Viewport>
                          </Select.Content>
                        </Select>
                      </XStack>
                    </XStack>
                    <Button
                      onPress={() => setInTakeAdded(true)}
                      {...shadows.small}
                      backgroundColor="#FD4F01"
                      fontWeight="700"
                      color="white"
                      px={16}
                      py={10}
                      hoverStyle={{ backgroundColor: '#DC2626' }}>
                      Add
                    </Button>
                  </XStack>
                </YStack>
              ) : (
                <XStack
                  p="$3"
                  justifyContent="center"
                  bg="#E5F8EA"
                  borderRadius={12}
                  gap="$2"
                  alignItems="center">
                  <Text color="#009A21" fontSize={16} fontWeight={700}>
                    {type} intake Added
                  </Text>
                  <CircleBroken />
                </XStack>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
