import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import Coin from 'public/images/coin.svg';
import CurrentOrders from '~/components/my-orders/CurrentOrders';
import CompletedOrders from '~/components/my-orders/CompletedOrders';
export default function Orders() {
  const [buttonStatus, setButtonStatus] = useState('current');

  const truncateText = (text: string) => {
    if (text.length > 19) {
      return text.substring(0, 19) + '...';
    }
    return text;
  };
  const height = Dimensions.get('screen').height + 500;
  return (
    <YStack flex={1} bg="white" minHeight={1000} mb={200}>
      <SafeAreaView style={style.container}>
        <DrawerPageHeader title="My Orders" />
        <YStack px="$4" flex={1}>
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
          {buttonStatus === 'current' && <CurrentOrders />}
          {buttonStatus === 'completed' && <CompletedOrders />}
        </YStack>
      </SafeAreaView>
      {/* <Text>df</Text> */}
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    marginTop: 20,
  },
});
