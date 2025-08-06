import { Button, Image, Text, View, XStack, YStack } from 'tamagui';
import Coin from 'public/images/coin.svg';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CheckCircle from 'public/images/orders/check-circle-broken.svg';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Order } from '~/src/types/type';
import { baseUrl } from '~/src/constants/baseConstant';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { formatToCustomDateString } from '~/src/helper';
export default function CompletedOrders() {
  const [orders, setOrdersData] = useState<Order[]>([]);
  const user = useSelector((s: RootState) => s.user.user);
  const truncateText = (text: string) => {
    if (text?.length > 19) {
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
        const processingData = data.filter((order: Order) => order.status === 'completed');
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
  return (
    <FlatList
      ListFooterComponent={<View h={300}></View>}
      contentContainerStyle={style.flatlist}
      data={orders}
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
            {item.status}
          </Text>
          <XStack mt="$3" gap="$2" flex={1}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(protected)/(orders)/order-details',
                  params: {},
                })
              }>
              <Image src={item.items[0].meta._thumbnail} width={60} height={60} />
            </TouchableOpacity>
            <YStack flex={1}>
              <Text fontSize={12} color="#383A42" numberOfLines={1}>
                Order Number:{' '}
                <Text color="#1E1F20" fontWeight={500}>
                  {item._id}
                </Text>
              </Text>
              <XStack width="100%" alignSelf="stretch" justifyContent="space-between" mt="$1">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(protected)/(orders)/order-details',
                      params: {},
                    })
                  }>
                  <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                    {truncateText(item.items[0].order_item_name)}
                  </Text>
                </TouchableOpacity>
                <XStack alignItems="center" gap={4}>
                  <Text>${item.total}</Text>
                  {/* <Coin /> */}
                </XStack>
              </XStack>
              <XStack flex={1} justifyContent="space-between" mt="$1">
                <Text fontSize={14} color="#1E1F20">
                  {formatToCustomDateString(item.createdAt)}
                </Text>
                <Text fontSize={14} color="#1E1F20">
                  {item.items.length}
                </Text>
              </XStack>
            </YStack>
          </XStack>
          <XStack gap="$2" mt="$2">
            <XStack gap="$1">
              <Image
                width={28}
                height={28}
                src={require('public/images/Cajun Garnalen - Gele rijst - Edamame Beans 1.png')}
              />
              <XStack px={9} py="$2" bg="white" borderRadius={4}>
                <Text color="#8E95A2" fontWeight={500} fontSize={12}>
                  {item.items.length}{' '}
                </Text>
              </XStack>
            </XStack>
            <XStack alignItems="center" gap="$1">
              <CheckCircle />
              <Text color="#009A21" fontSize={12} fontWeight={600}>
                Order delivered
              </Text>
            </XStack>
          </XStack>
          <XStack
            flex={1}
            gap="$3"
            width={'100%'}
            borderBottomColor="#B6BAC3"
            py="$3"
            borderBottomWidth={index < pendingOrder.length - 1 ? 1 : 0}>
            <Button
              mt="$2"
              width="48%"
              bg="white"
              borderWidth={1}
              borderColor="#FD4F01"
              color="#FD4F01"
              fontSize={12}
              fontWeight={700}
              // shadowColor="rgba(10, 13, 18, 0.05)"
              // shadowOffset={{ width: 0, height: 1 }}
              // shadowOpacity={0.05}
              // shadowRadius={2}
              // elevation={1}
            >
              Leave a Review{' '}
            </Button>
            <Button
              mt="$2"
              width="48%"
              bg="white"
              borderWidth={1}
              borderColor="#FD4F01"
              color="#FD4F01"
              fontSize={12}
              fontWeight={700}
              // shadowColor="rgba(10, 13, 18, 0.05)"
              // shadowOffset={{ width: 0, height: 1 }}
              // shadowOpacity={0.05}
              // shadowRadius={2}
              // elevation={1}
            >
              Reorder
            </Button>
          </XStack>
        </YStack>
      )}
    />
  );
}
const pendingOrder = [
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
  {
    status: '7 April, 01:20 pm ',
    orderNumber: 'FA234VUE34Q6D',
    name: 'Beef Teriyaki Noodles',
    date: '7 April, 01:20 pm ',
    balance: '1260',
    amount: '5 items',
    deliver: true,
  },
];

const style = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
});
