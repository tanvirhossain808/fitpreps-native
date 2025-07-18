import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from 'tamagui';
import FooterCart from '~/src/components/shared/cart/CartFooter';
import SubsHeader from '~/src/components/shared/cart/Subscription/SubsHeader';
import SubsPlan from '~/src/components/shared/cart/Subscription/SubsPlan';
import PurchaseSubPay from './PurchaseSubPay';
import { subscriptionPlans } from '~/src/constant';
import { SubPlan } from '~/src/types/type';

export default function PurchaseStep1({
  setCurrentStep,
  orderData,
  selectedSubPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  cartType: string;
  orderData: any;
  selectedSubPlan: SubPlan;
}) {
  return (
    <>
      <FlatList
        ListFooterComponent={
          <PurchaseSubPay orderData={orderData} setCurrentStep={setCurrentStep} />
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View h={12} />}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 20,
        }}
        data={['']}
        style={{ ...style.flastListContainer }}
        ListHeaderComponent={<SubsHeader selectedSubPlan={selectedSubPlan} />}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        renderItem={() => <SubsPlan />}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

const style = StyleSheet.create({
  flastListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
