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

// Define form data interface
interface CheckoutFormData {
  billing_email: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_phone: string;
  billing_company: string;
  billing_company_kvk: string;
  billing_company_vat: string;
  shipping_email: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_country: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postcode: string;
  shipping_phone: string;
  shipping_company: string;
  shipping_company_kvk: string;
  shipping_company_vat: string;
  delivery_time: string;
  paymentMethod: string;
  customerType: 'individual' | 'business';
  deliveryDate: string | null;
}

export default function Cart() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowMapModal, setShowMapModal] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [date, setDate] = useState<DateData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const [selectedSubPlan, setSelectedSubPlan] = useState<any>(null);
  
  // Add checkout form data state
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData | null>(null);
  
  const { cartType = 'meals', subscriptionType } = useLocalSearchParams() || {};
  const { user } = useSelector((s: RootState) => s.user) || {};
  const cartItems = useSelector((s: RootState) => s.cart.cartItems);
  const couponCode = useSelector((s: RootState) => s.cart.couponCode);
  const shippingCountry = useSelector((s: RootState) => s.cart.shippingCountry);
  
  const [couponData, { isSuccess, isLoading, error }] = useVerifyCouponMutation();
  const { orderData, errors, loyaltyPoints } = useOrderData({
    user: user!.user,
    cart: Object.values(cartItems) as any,
    coupon: couponCode,
    fitCouponData: { discountAmount: 20 },
    detectedCountry: shippingCountry as any || 'NL',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCoupon(null));
  }, []);

  useEffect(() => {
    dispatch(setSubTotal(orderData.subTotal));
    dispatch(setTotal(orderData.metadata._order_total));
    dispatch(setTax(orderData.metadata._order_shipping_tax));
    // Don't override shipping from useCartLogic - let it handle dynamic shipping
    // dispatch(setShipping(orderData.metadata._order_shipping));
  }, [orderData]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const response = await couponData({
        couponCode: 'summerfit',
        userId: user.user._id,
        token: user.token,
      });
    }
    fetchData();
  }, [couponData]);

  // Steps configuration
  const cartSteps: { [key: number]: any } = {
    0: (
      <CartStep1
        orderData={orderData}
        setCurrentStep={setCurrentStep}
        cartType={cartType as string}
        date={date}
        setDate={setDate}
      />
    ),
    1: (
      <CartStep2
        orderData={orderData}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
        date={date}
        setDate={setDate}
        setCurrentStep={setCurrentStep}
        isEditAddress={isEditAddress}
        setIsEditAddress={setIsEditAddress}
        isShowMapModal={isShowMapModal}
        setShowMapModal={setShowMapModal}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        selectedSubPlan={selectedSubPlan}
        setSelectedSubPlan={setSelectedSubPlan}
        onFormDataChange={setCheckoutFormData}
      />
    ),
    2: (
      <CartStep3 
        setCurrentStep={setCurrentStep} 
        subsType={subscriptionType as string} 
        checkoutFormData={checkoutFormData}
      />
    ),
  };

  const CurrentStep = cartSteps[currentStep] || cartSteps[0];

  // Step titles for better UX
  const getStepTitle = (step: number) => {
    switch (step) {
      case 0: return 'Winkelwagen';
      case 1: return 'Bezorggegevens';
      case 2: return 'Betalingssamenvatting';
      default: return 'Checkout';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      
      {/* Step Indicator - Updated to show current step */}
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
        stepTitle={getStepTitle(currentStep)}
        totalSteps={3}
      />
      
      {/* Current Step Component */}
      {CurrentStep}
    </SafeAreaView>
  );
}
