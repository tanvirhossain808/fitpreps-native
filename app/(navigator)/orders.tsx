import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import Coin from 'public/images/coin.svg';
export default function Orders() {
  const [buttonStatus, setButtonStatus] = useState('current');

  const truncateText = (text: string) => {
    if (text.length > 19) {
      return text.substring(0, 19) + '...';
    }
    return text;
  };

  return (
    <YStack flex={1} bg="white">
      <SafeAreaView style={style.container}>
        <ScrollView f={1}>
          <DrawerPageHeader title="My Orders" />
          <YStack px="$4">
            <XStack w="100%">
              <Button
                onPress={() => setButtonStatus('current')}
                w="50%"
                bg={buttonStatus === 'current' ? '#FD4F01' : '#f6f6f8'}
                fontSize={16}
                fontWeight={buttonStatus === 'current' ? 700 : 500}
                color={buttonStatus === 'current' ? 'white' : '#1E1F20'}>
                Current
              </Button>
              <Button
                onPress={() => setButtonStatus('completed')}
                w="50%"
                bg={buttonStatus === 'completed' ? '#FD4F01' : '#f6f6f8'}
                fontSize={16}
                fontWeight={buttonStatus === 'completed' ? 700 : 500}
                color={buttonStatus === 'completed' ? 'white' : '#1E1F20'}>
                Completed
              </Button>
            </XStack>
            <YStack py="$5">
              <YStack
                width="100%"
                py="$5"
                px="$4"
                borderRadius={12}
                bg="linear-gradient(47deg, rgba(255, 184, 23, 0.20) -9.34%, rgba(255, 255, 255, 0.20) 116.69%)">
                <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                  Out for delivery
                </Text>
                <XStack mt="$3" gap="$2" flex={1}>
                  <Image src={require('public/images/orderfood.png')} width={60} height={60} />
                  <YStack flex={1}>
                    <Text fontSize={12} color="#383A42">
                      Order Number:{' '}
                      <Text color="#1E1F20" fontWeight={500}>
                        FA234VUE34Q6D
                      </Text>
                    </Text>
                    <XStack width="100%" alignSelf="stretch" justifyContent="space-between" mt="$1">
                      <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                        {truncateText('Beef Teriyaki Noodles')}
                      </Text>
                      <XStack alignItems="center" gap={4}>
                        <Text>1260</Text>
                        <Coin />
                      </XStack>
                    </XStack>
                    <XStack flex={1} justifyContent="space-between" mt="$1">
                      <Text fontSize={14} color="#1E1F20">
                        7 April, 01:20 pm
                      </Text>
                      <Text fontSize={14} color="#1E1F20">
                        5 items
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
                <XStack mt="$1" gap="$1">
                  <Image
                    width={28}
                    height={28}
                    src={require('public/images/Cajun Garnalen - Gele rijst - Edamame Beans 1.png')}
                  />
                  <XStack px={9} py="$2" bg="white" borderRadius={4}>
                    <Text color="#8E95A2" fontWeight={500} fontSize={12}>
                      +3
                    </Text>
                  </XStack>
                </XStack>
                <Button
                  mt="$2"
                  bg="white"
                  borderWidth={1}
                  borderColor="#FD4F01"
                  color="#FD4F01"
                  fontSize={12}
                  fontWeight={700}
                  shadowColor="rgba(10, 13, 18, 0.05)"
                  shadowOffset={{ width: 0, height: 1 }}
                  shadowOpacity={0.05}
                  shadowRadius={2}
                  elevation={1}>
                  Track Order
                </Button>
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const pendingOrder = [
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
];
