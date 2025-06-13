import { View, Text, Button } from 'tamagui';
import React from 'react';

export default function CartStep2({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <View flex={1} padding={16}>
      <Text>Delivery & Payment Step</Text>
      <Button onPress={() => setCurrentStep(2)}>Proceed to Confirmation</Button>
      <Button onPress={() => setCurrentStep(0)}>Back to Cart</Button>
    </View>
  );
}
