import { Button, Image, Text, View, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import OrderedItemDetails from './OrderedItemDetails';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
// import { useLazyCheckOrdersStatusQuery } from '~/src/store/apiSlices/checkOrdersStatusSlice';
import { baseUrl } from '~/src/constants/baseConstant';
import { Order } from '~/src/types/type';
export default function CurrentOrders() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
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
        const response = await fetch(baseUrl + '/api/orders/order?userId=' + user.user._id, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status !== 200) {
          throw new Error('Error');
        }
        const data = await response.json();
        if (data.message === 'Invalid Token') {
          console.log('error');
        }
        const processingData = data.filter((order: Order) => order.status === 'processing');
        setOrdersData(processingData);
      } catch (error) {
        console.log(error, 'de');
      }
    };
    // reset();

    // reset();
    // fetchOrderStatus({
    //   id: user.user._id,
    //   token: user.token,
    // });
    fetchOrderData();
    // return () => {
    //   console.log('hey');
    // };
  }, []);
  // console.log(user);
  return (
    <FlatList
      ListFooterComponent={<View h={300}></View>}
      contentContainerStyle={style.flatlist}
      data={ordersData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => (
        <YStack
          bg="linear-gradient(47deg, rgba(255, 184, 23, 0.20) -9.34%, rgba(255, 255, 255, 0.20) 116.69%)"
          width="100%"
          borderRadius={
            pendingOrder.length === 1
              ? 12
              : index === 0
                ? 12
                : index === pendingOrder.length - 1
                  ? 12
                  : 0
          }
          borderTopLeftRadius={pendingOrder.length > 1 && index > 0 ? 0 : 12}
          borderTopRightRadius={pendingOrder.length > 1 && index > 0 ? 0 : 12}
          borderBottomLeftRadius={
            pendingOrder.length > 1 && index < pendingOrder.length - 1 ? 0 : 12
          }
          borderBottomRightRadius={
            pendingOrder.length > 1 && index < pendingOrder.length - 1 ? 0 : 12
          }
          paddingTop={20}
          paddingBottom={
            pendingOrder.length === 1 ? 20 : index === pendingOrder.length - 1 ? 20 : 0
          }
          paddingHorizontal={16}>
          <Text color="#1E1F20" fontSize={16} fontWeight={700}>
            Out for delivery
          </Text>
          <YStack mt="$3">
            <OrderedItemDetails ordersData={item} />
          </YStack>

          <YStack
            borderBottomColor="#B6BAC3"
            py="$3"
            borderBottomWidth={index < pendingOrder.length - 1 ? 1 : 0}>
            <Button
              onPress={() =>
                router.push({
                  pathname: '/(protected)/(orders)/track-order',
                  params: { trackingNumber: 'ASDGH234GAS24s' },
                })
              }
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
      )}
    />
  );
}
const pendingOrder = [
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
  {
    status: 'Out for delivery',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
  },
];

const style = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
});
