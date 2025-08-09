import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Coin from 'public/images/coin.svg';
import CurrentOrders from '~/src/components/my-orders/CurrentOrders';
import CompletedOrders from '~/src/components/my-orders/CompletedOrders';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { Order } from '~/src/types/type';
import { baseUrl } from '~/src/constants/baseConstant';
export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [buttonStatus, setButtonStatus] = useState('current');
  const user = useSelector((s: RootState) => s?.user?.user);

  const truncateText = (text: string) => {
    if (text.length > 19) {
      return text.substring(0, 19) + '...';
    }
    return text;
  };
  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(baseUrl + '/api/orders/order?userId=' + user.user._id, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status !== 200) {
          setIsLoading(false);
          throw new Error('Error');
        }
        const data = await response.json();
        if (data.message === 'Invalid Token') {
          setIsLoading(false);
          console.log('error');
        }
        const processingData = data.filter((order: Order) => order.status !== 'completed');
        setOrdersData(processingData);
        setIsLoading(false);
      } catch (error) {
        console.log(error, 'de');
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);
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
          {buttonStatus === 'current' && (
            <CurrentOrders ordersData={ordersData} isLoading={isLoading} />
          )}
          {buttonStatus === 'completed' && (
            <CompletedOrders isLoading={isLoading} ordersData={ordersData} />
          )}
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
