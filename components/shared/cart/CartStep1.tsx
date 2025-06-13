import { View } from 'tamagui';
import React from 'react';
import { FlatList } from 'react-native';
import FooterCart from './CartFooter';
import CartHeader from './CartHeader';
import { extraFoods } from '~/constant';
import CartFoodList from './CartFoodList';

export default function CartStep1({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <FlatList
      ListFooterComponent={<FooterCart setCurrentStep={setCurrentStep} />}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View h={12} />}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20,
      }}
      style={{ flex: 1, paddingHorizontal: 16 }}
      ListHeaderComponent={<CartHeader />}
      ListHeaderComponentStyle={{ marginBottom: 20 }}
      data={extraFoods}
      renderItem={({ item, index }) => (
        <View
          key={index}
          style={{
            marginTop: index === 0 ? 20 : 0,
            marginBottom: index === extraFoods.length - 1 ? 20 : 0,
          }}>
          <CartFoodList item={item} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
