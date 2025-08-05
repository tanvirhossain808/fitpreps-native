import { Button, Text, Input, YStack, XStack } from 'tamagui';
import CouponTicket from 'public/images/couponTicket.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import { setCoupon, setDiscount } from '~/src/store/slices/cartSlice';
import { router } from 'expo-router';
import { Coupon } from '~/src/types/type';
import { baseUrl } from '~/src/constants/baseConstant';
import { useCartLogic } from '~/src/hooks/useCartLogic';

export default function Saving({ isCommingSoon = false }: { isCommingSoon?: boolean }) {
  const { token, user } = useSelector((s: RootState) => s.user.user!);
  const { cartItems, couponCode: appliedCoupon } = useSelector((s: RootState) => s.cart);
  const { shippingFee } = useCartLogic();
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validCoupons = ['freesnack', 'summerfit', 'willem', 'mama', 'summer', 'father', 'fit'];

  // Calculate base order value (without supplements)
  const calculateBaseOrderValue = () => {
    return Object.values(cartItems).reduce((total: number, item: any) => {
      if (!item.categories.includes("Supplements")) {
        return total + (item.quantity * Number(item.metadata._price));
      }
      return total;
    }, 0);
  };

  // Calculate discount based on coupon data (same logic as web)
  const calculateDiscount = () => {
    // Use appliedCoupon from Redux state instead of local couponData
    const couponToUse = appliedCoupon || couponData;
    
    if (!couponToUse) {
      return { discount: 0, message: "No coupon applied.", shouldFreeShip: false };
    }

    const {
      discountType,
      amount,
      individualUse,
      minimumAmount,
      maximumAmount,
      freeShipping,
      usageLimit,
      usageCount,
      excludeSaleItems,
      code
    } = couponToUse;

    let discount = 0;
    const baseOrderValue = calculateBaseOrderValue();

    if (code === "fit") {
      const fitDiscount = 20; // Default fit coupon discount
      let ship = 0;
      if (freeShipping) {
        ship = shippingFee; // Use dynamic shipping cost
      }
      return { discount: fitDiscount + ship, message: "Tiered percentage discount applied.", shouldFreeShip: freeShipping };
    }

    if (minimumAmount && baseOrderValue < parseFloat(minimumAmount)) {
      return { discount: 0, message: `Minimum amount for this coupon is ${minimumAmount} Euro`, shouldFreeShip: false };
    }

    switch (discountType) {
      case 'fixed_cart':
        discount = parseFloat(amount);
        if (maximumAmount && discount > parseFloat(maximumAmount)) {
          discount = parseFloat(maximumAmount);
        }
        break;

      case 'percent':
        discount = (baseOrderValue * parseFloat(amount)) / 100;
        if (maximumAmount && discount > parseFloat(maximumAmount)) {
          discount = parseFloat(maximumAmount);
        }
        break;

      default:
        return { discount: 0, message: "Invalid discount type.", shouldFreeShip: false };
    }

    // Ensure the discount doesn't exceed the base order value
    if (discount > baseOrderValue) {
      discount = baseOrderValue;
    }

    return { discount, message: "Coupon applied successfully.", shouldFreeShip: freeShipping };
  };

  const handleSubmitCoupon = async () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Geen gebruiker gevonden',
        text2: 'Log in om door te gaan',
      });
      return;
    }

    if (isCommingSoon) {
      return Toast.show({
        type: 'error',
        text1: 'Niet beschikbaar',
        text2: 'Binnenkort beschikbaar',
      });
    }

    if (!couponCode.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Voer een kortingscode in',
      });
      return;
    }

    setIsLoading(true);

    try {
      const lowerCouponCode = couponCode.toLowerCase();
      
      if (validCoupons.includes(lowerCouponCode)) {
        setCouponCode(lowerCouponCode);
      }

             const response = await fetch(`${baseUrl}/api/coupons/validate/${lowerCouponCode}?userId=${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCouponData(data.coupon);
        
        // Handle special coupon logic (same as web)
        switch(data.coupon.code) {
          case "freesnack":
            // For freesnack, we would add a free item to cart
            // This would require additional Redux actions
            break;
          case "summerfit":
            // Check free items eligibility
            break;
          case "willem":
            // Check willem eligibility
            break;
          case "mama":
            // Check mama eligibility
            break;
          case "summer":
            // Check stepping up eligibility
            break;
          case "father":
            // Check stepping up eligibility
            break;
          case "fit":
            // Apply fit coupon
            break;
        }

        // Calculate discount directly from API response
        const couponFromAPI = data.coupon;
        let calculatedDiscount = 0;
        const baseOrderValue = calculateBaseOrderValue();

        if (couponFromAPI.code === "fit") {
          calculatedDiscount = 20; // Default fit coupon discount
          if (couponFromAPI.freeShipping) {
            calculatedDiscount += 6.95; // Add shipping cost
          }
        } else if (couponFromAPI.discountType === 'fixed_cart') {
          calculatedDiscount = parseFloat(couponFromAPI.amount);
          if (couponFromAPI.maximumAmount && calculatedDiscount > parseFloat(couponFromAPI.maximumAmount)) {
            calculatedDiscount = parseFloat(couponFromAPI.maximumAmount);
          }
        } else if (couponFromAPI.discountType === 'percent') {
          calculatedDiscount = (baseOrderValue * parseFloat(couponFromAPI.amount)) / 100;
          if (couponFromAPI.maximumAmount && calculatedDiscount > parseFloat(couponFromAPI.maximumAmount)) {
            calculatedDiscount = parseFloat(couponFromAPI.maximumAmount);
          }
        }

        // Ensure the discount doesn't exceed the base order value
        if (calculatedDiscount > baseOrderValue) {
          calculatedDiscount = baseOrderValue;
        }

        // Update Redux state
        console.log('Saving component - Setting discount:', calculatedDiscount);
        console.log('Saving component - Setting coupon:', couponFromAPI);
        dispatch(setDiscount(calculatedDiscount));
        dispatch(setCoupon(couponFromAPI));
        setCouponData(couponFromAPI);

        Toast.show({
          type: 'success',
          text1: data.message || 'Kortingscode toegepast!',
        });

        setCouponCode('');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Ongeldige kortingscode',
          text2: data.message || 'De kortingscode is niet geldig',
        });
      }
    } catch (err) {
      console.error('Coupon validation error:', err);
      Toast.show({
        type: 'error',
        text1: 'Fout bij toepassen kortingscode',
        text2: 'Er is iets misgegaan',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponData(null);
    setCouponCode('');
    dispatch(setDiscount(0));
    dispatch(setCoupon(null));
    
    Toast.show({
      type: 'success',
      text1: 'Kortingscode verwijderd',
    });
  };

  // Show applied coupon or input field
  if (appliedCoupon?.code) {
    return (
      <YStack gap="$3" mt={12}>
        <Text color="#1E1F20" fontWeight={700} fontSize={16}>
          Kortingscode
        </Text>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          p="$3"
          bg="#F0F9FF"
          borderColor="#0EA5E9"
          borderWidth={1}
          borderRadius={8}>
          <XStack alignItems="center" gap="$2" flex={1}>
            <CouponTicket style={{ marginTop: 4 }} />
            <YStack flex={1}>
              <Text color="#0EA5E9" fontWeight={600} fontSize={14}>
                {appliedCoupon.code.toUpperCase()}
              </Text>
              <Text color="#64748B" fontSize={12}>
                {couponData?.discountType === 'fixed_cart' 
                  ? `€${couponData.amount} korting`
                  : couponData?.discountType === 'percent'
                  ? `${couponData.amount}% korting`
                  : 'Kortingscode toegepast'
                }
              </Text>
            </YStack>
          </XStack>
          <Button
            onPress={handleRemoveCoupon}
            bg="transparent"
            borderWidth={0}
            p="$2">
            <Text color="#EF4444" fontSize={12} fontWeight={600}>
              Verwijderen
            </Text>
          </Button>
        </XStack>
      </YStack>
    );
  }

  return (
    <YStack gap="$3" mt={12}>
      <Text color="#1E1F20" fontWeight={700} fontSize={16}>
        Kortingscode
      </Text>
      <XStack alignItems="center" gap="$2">
        <XStack
          gap={2}
          flex={1}
          height={45}
          bg="white"
          alignSelf="stretch"
          alignItems="center"
          px={14}
          borderColor="#EDEEF1"
          borderWidth={1}
          borderRadius={8}>
          <CouponTicket style={{ marginTop: 4 }} />
          <Input
            value={couponCode}
            py={0}
            alignSelf="stretch"
            flex={1}
            placeholder="Voer kortingscode in"
            placeholderTextColor="#8E95A2"
            fontSize={14}
            bg="transparent"
            borderWidth={0}
            outlineWidth={0}
            onChangeText={setCouponCode}
            onSubmitEditing={handleSubmitCoupon}
          />
        </XStack>
        <Button
          onPress={handleSubmitCoupon}
          disabled={isLoading}
          height={45}
          px={20}
          py={10}
          fontSize={16}
          fontWeight="700"
          color="#FD4F01"
          borderRadius={8}
          borderWidth={1}
          borderColor="#FD4F01"
          bg="white">
          {isLoading ? 'Toepassen...' : 'Toepassen'}
        </Button>
      </XStack>
    </YStack>
  );
}
