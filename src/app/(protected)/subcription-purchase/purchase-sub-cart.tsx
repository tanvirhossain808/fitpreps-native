import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import SubscriptionCheckoutForm from './partials/purchase-sub/SubscriptionCheckoutForm';
export default function PurchaseSubCart() {
  const { 
    selectedPlan: subPlan,
    totalCost,
    totalPoints,
    plan,
    type,
    bonusPoints,
    regularPoints,
    originalPrice
  } = useLocalSearchParams() || {};
  
  const user = useSelector((state: RootState) => state.user.user?.user);
  
  console.log({
    totalCost,
    totalPoints,
    plan,
    type,
    bonusPoints,
    regularPoints,
    originalPrice
  }, 'subscription params');

  if (!plan) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No subscription plan selected',
    });
    router.back();
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <SubscriptionCheckoutForm
        totalCost={totalCost as any}
        totalPoints={totalPoints as any}
        plan={plan}
        type={type}
        bonusPoints={bonusPoints as any}
        regularPoints={regularPoints as any}
        originalPrice={originalPrice as any}
        user={user}
      />
    </SafeAreaView>
  );
}
