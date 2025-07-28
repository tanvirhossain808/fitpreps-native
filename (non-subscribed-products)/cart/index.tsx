import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from '~/src/components/shared/StepIndicator';
import { useEffect, useState } from 'react';
import CartStep2 from '~/src/components/shared/cart/CartStep2';
import CartStep3 from '~/src/components/shared/cart/CartStep3';
import CartStep1 from '~/src/components/shared/cart/CartStep1';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useVerifyCouponMutation } from '~/src/store/apiSlices/verifyCouponSlice';
import { RootState } from '~/src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useCartLogic } from '~/src/hooks/useCartLogic';
import {
  setCoupon,
  setShipping,
  setSubTotal,
  setTax,
  setTotal,
} from '~/src/store/slices/cartSlice';
import { useOrderData } from '~/src/hooks/useOrderData';
import { DateData } from 'react-native-calendars';
export default function Cart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [date, setDate] = useState<DateData | null>(null);
  const { cartType = 'meals', subscriptionType } = useLocalSearchParams() || {};
  const { user } = useSelector((s: RootState) => s.user) || {};
  const cartItems = useSelector((s: RootState) => s.cart.cartItems);
  const couponCode = useSelector((s: RootState) => s.cart.couponCode);
  const [couponData, { isSuccess, isLoading, error }] = useVerifyCouponMutation();
  const { orderData, errors, loyaltyPoints } = useOrderData({
    user: user!.user,
    cart: Object.values(cartItems) as any,
    coupon: couponCode,
    fitCouponData: { discountAmount: 20 },
    detectedCountry: 'NL',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCoupon(null));
  }, []);
  // console.log(orderData, 'datai');
  useEffect(() => {
    dispatch(setSubTotal(orderData.subTotal));
    dispatch(setTotal(orderData.metadata._order_total));
    dispatch(setTax(orderData.metadata._order_shipping_tax));
    dispatch(setShipping(orderData.metadata._order_shipping));
  }, [orderData]);
  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const response = await couponData({
        couponCode: 'summerfit',
        userId: user.user._id,
        token: user.token,
      });
      console.log(response, 'coupon data');
    }
    fetchData();
  }, [couponData]);
  // const { sub, tax, shippingFee, discount, final } = useCartLogic();
  // useEffect(() => {
  //   if (sub > 125) {
  //     dispatch(setShipping(0));
  //   }
  //   dispatch(setSubTotal(sub));
  // }, [sub]);

  const cartSteps: { [key: number]: any } = {
    0: (
      <CartStep1
        orderData={orderData}
        date={date}
        setDate={setDate}
        setCurrentStep={setCurrentStep}
        cartType={cartType as string}
      />
    ),
    1: (
      <CartStep2
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        setIsEditAddress={setIsEditAddress}
        isShowMapModal={isShowMapModal}
        setShowMapModal={setShowMapModal}
      />
    ),
    2: <CartStep3 setCurrentStep={setCurrentStep} subsType={subscriptionType as string} />,
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <StepIndicator
        cartType={cartType as string}
        setIsEditAddress={setIsEditAddress}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        isShowMapModal={isShowMapModal}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        setShowMapModal={setShowMapModal}
      />
      {CurrentStep}
    </SafeAreaView>
  );
}
