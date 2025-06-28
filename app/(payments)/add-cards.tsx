import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import { shadows } from '~/constant';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
export default function AddCards() {
  const [showSecretNumber, setShowSecretNumber] = useState(false);
  const [isdiableButton, setIsDabledButton] = useState(true);
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={{ ...style.container }}>
        <DrawerPageHeader title="Add New Card" />
        <YStack f={1} px="$4" justifyContent="space-between">
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
            {cardInputFeilds.map((fields, i) => (
              <XStack
                alignItems="center"
                key={i}
                py={4}
                px={14}
                bg="white"
                {...shadows.small}
                borderWidth={1}
                borderRadius={8}
                borderColor="#EDEEF1">
                <Input
                  flex={1}
                  //   alignSelf="stretch"
                  //   h={40
                  boxShadow="none"
                  borderWidth={0}
                  background={'transparent'}
                  outline="none"
                  placeholder={fields.placeholder}
                  bg="white"
                  p={0}
                />
                {fields.name === 'CVV - test' && (
                  <TouchableOpacity onPress={() => setShowSecretNumber(!showSecretNumber)}>
                    <Feather
                      name={showSecretNumber ? 'eye' : 'eye-off'}
                      size={20}
                      color={showSecretNumber ? 'black' : '#8E95A2'}
                    />
                  </TouchableOpacity>
                )}
              </XStack>
            ))}
          </YStack>
          <XStack py="$5">
            <Button
              disabled={isdiableButton}
              bg={isdiableButton ? '#FFC5AA' : '#FD4F01'}
              color="#FFF"
              fontWeight={700}
              fontSize={16}
              h={43}
              f={1}>
              Save card
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
  manage: {
    borderBottomColor: '#FD4F01',
    borderBottomWidth: 2,
  },
});

const cardInputFeilds = [
  { name: 'xxxx xxxx xxxx xxxx', placeholder: 'xxxx xxxx xxxx xxxx' },
  {
    name: 'Name on card - test',
    placeholder: 'Expiry Date - test',
  },
  { name: 'Expiry Date - test', placeholder: 'Expiry Date - test' },
  { name: 'CVV - test', placeholder: 'CVV - test' },
];
