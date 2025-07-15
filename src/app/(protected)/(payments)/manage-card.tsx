import React, { createElement, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Fieldset, Input, Label, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Visa from 'public/images/visa.svg';
import Success from '~/src/components/shared/SuccessModa';
export default function ManageCard() {
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={{ ...style.container }}>
        <DrawerPageHeader title="Manage Card" />
        <YStack f={1} px="$4" justifyContent="space-between">
          <ScrollView>
            <YStack py="$5" gap="$5">
              <XStack alignItems="center" justifyContent="space-between">
                <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                  Card Name
                </Text>
                <TouchableOpacity style={style.manage}>
                  <Text color="#FD4F01" fontSize={16} fontWeight={700}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </XStack>
              <YStack gap="$5" p="$5" bg="#F6F6F8" borderRadius={12}>
                {cardInfo.map((data, i) => (
                  <Fieldset key={i}>
                    <Label color="#414651" fontSize={12} fontWeight={600}>
                      {data.name}
                    </Label>
                    <XStack
                      px="14"
                      p={10}
                      h="$4"
                      borderWidth={1}
                      borderColor="#EDEEF1"
                      bg="white"
                      alignItems="center"
                      borderRadius={8}>
                      {data.icon ? (
                        <XStack alignItems="center" gap="$2">
                          <XStack>
                            <View>
                              {Visa({ style: { width: 20, height: 20, position: 'absolute' } })}
                              <Text opacity={0}>opacity</Text>
                            </View>

                            <Input
                              flex={1}
                              h={'100%'}
                              bg="transparent"
                              boxShadow="none"
                              borderWidth={0}
                              p={0}
                              outline="none"
                              placeholder={data.placeholder}
                            />
                          </XStack>
                        </XStack>
                      ) : (
                        <Input
                          flex={1}
                          h={'100%'}
                          fontSize={14}
                          bg="white"
                          boxShadow="none"
                          borderWidth={0}
                          p={0}
                          outline="none"
                          placeholder={data.placeholder}
                        />
                      )}
                    </XStack>
                  </Fieldset>
                ))}
              </YStack>
            </YStack>
          </ScrollView>
          <XStack py="$5">
            <XStack py="$5" gap={10}>
              <Button
                w="48%"
                onPress={() => setShowSuccessPopUp(false)}
                backgroundColor="white"
                elevation={2}
                shadowColor="#FF7435"
                shadowOffset={{ width: 0, height: 0 }}
                shadowOpacity={1}
                shadowRadius={2}
                borderRadius={8}
                fontSize={16}
                fontWeight={700}
                borderWidth={1}
                borderColor="#FD4F01"
                color="#FD4F01">
                Cancel
              </Button>
              <Button
                w="48%"
                onPress={() => setShowSuccessPopUp(true)}
                backgroundColor="#FD4F01"
                elevation={2}
                shadowColor="#FF7435"
                shadowOffset={{ width: 0, height: 0 }}
                shadowOpacity={1}
                shadowRadius={2}
                borderRadius={8}
                fontSize={16}
                fontWeight={700}
                borderWidth={1}
                borderColor="#FD4F01"
                color="white">
                Save Changes
              </Button>
            </XStack>
          </XStack>
        </YStack>
      </SafeAreaView>
      {showSuccessPopUp && (
        <Success
          open={showSuccessPopUp}
          onOpenChange={setShowSuccessPopUp}
          title={'You have successfully made changes.'}
        />
      )}
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  manage: {
    borderBottomColor: '#FD4F01',
    borderBottomWidth: 2,
  },
});

const cardInfo = [
  {
    name: 'Card Number',
    icon: () => createElement(Visa),
    placeholder: 'xxxx xxxx xxxx xxxx',
    value: 'xxxx xxxx xxxx xxxx',
  },
  {
    name: 'Valid Through',
    icon: '',
    placeholder: 'xx/xx',
    value: 'xx/xx',
  },
  {
    name: 'Card Nickname',
    icon: '',
    placeholder: 'Add card nickname for easy identification',
    value: 'xx/xx',
  },
];
