import { Button, ButtonText, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatList } from 'react-native';
import { extraFoods } from '~/constant';
import CartFoodList from '~/components/shared/cart/CartFoodList';
import FooterCart from '~/components/shared/cart/CartFooter';
import CartHeader from '~/components/shared/cart/CartHeader';
import StepIndicator from '~/components/shared/StepIndicator';
import { useState } from 'react';
import CartStep2 from '~/components/shared/cart/CartStep2';
import CartStep3 from '~/components/shared/cart/CartStep3';
export default function Cart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  console.log(currentStep);
  const cartSteps: { [key: number]: any } = {
    0: (
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
    ),
    1: <CartStep2 setCurrentStep={setCurrentStep} />,
    2: <CartStep3 setCurrentStep={setCurrentStep} />,
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StepIndicator currentStep={currentStep} />
      {CurrentStep}
    </SafeAreaView>
  );
}
