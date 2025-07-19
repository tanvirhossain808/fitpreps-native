import { Button, Text, View, XStack, YStack } from 'tamagui';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { extraFoods } from '~/src/constant';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { router } from 'expo-router';
import CartFoodList from '~/src/components/shared/cart/CartFoodList';
import Saving from '~/src/components/shared/cart/Saving';
import CartCarousel from '~/src/components/shared/cart/CartCarosuel';
import FooterCart from '~/src/components/shared/cart/CartFooter';
import CartDatePicker from '~/src/components/shared/cart/CartDatePicker';
import SubsHeader from '~/src/components/shared/cart/Subscription/SubsHeader';
import SubsPlan from '~/src/components/shared/cart/Subscription/SubsPlan';
import SubscribeFooter from './SubscribedProductFooter';

export default function CartStep1({
  setCurrentStep,
  cartType,
  orderData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  cartType: string;
  orderData: any;
}) {
  const cartItems = useSelector((state: RootState) => state.subCart.subCartItems);
  const cartItemsList = Object.values(cartItems) || [];
  const dispatch = useDispatch();
  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <View
        key={index}
        style={{
          marginTop: index === 0 ? 20 : 0,
          marginBottom: index === extraFoods.length - 1 ? 20 : 0,
        }}>
        <CartFoodList item={item} />
      </View>
    );
  }, []);
  return (
    <>
      <FlatList
        ListFooterComponent={
          <YStack>
            <Saving />
            <CartCarousel />
            <SubscribeFooter setCurrentStep={setCurrentStep} orderData={orderData} />
          </YStack>
        }
        ListEmptyComponent={() => (
          <YStack gap="$5" ai="center" jc="center" f={1}>
            <Text fontSize={20} fontWeight="bold" color="#FD4F01">
              Cart is empty
            </Text>
            <Button
              bg="#FD4F01"
              fontSize={16}
              fontWeight="bold"
              color="white"
              onPress={() => router.back()}>
              Go back for more products
            </Button>
          </YStack>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View h={12} />}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 20,
        }}
        style={{ ...style.flastListContainer }}
        ListHeaderComponent={
          <YStack>
            <CartDatePicker cartType="purchase-sub" />
          </YStack>
        }
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        data={cartItemsList}
        renderItem={
          cartItemsList.length === 0
            ? () => (
                <YStack f={1} jc="center" ai="center">
                  <Text>Cart is empty</Text>
                  <Button onPress={() => router.navigate('/(navigator)/(tabs)/meals')}>
                    Go to Products
                  </Button>
                </YStack>
              )
            : renderItem
        }
        keyExtractor={(item) => item._id.toString()}
      />
    </>
  );
}

const renderItem = ({ item, index }: { item: any; index: number }) => {
  return <CartFoodList item={item} />;
};
const style = StyleSheet.create({
  flastListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
