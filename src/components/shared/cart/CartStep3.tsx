import { View, Text, Button, YStack, XStack, Input, ScrollView, Spinner } from 'tamagui';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateOrderMutation } from '~/src/store/apiSlices/createOrderSlice';
import { getFormattedDate } from '~/src/helper';
import { baseUrl } from '~/src/constants/baseConstant';
import { setCoupon, setDiscount } from '~/src/store/slices/cartSlice';
import { useCartLogic } from '~/src/hooks/useCartLogic';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';

export default function CartStep3({
  setCurrentStep,
  subsType,
  checkoutFormData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  subsType?: string | undefined;
  checkoutFormData?: any;
}) {
  // Timer state - 1 hour countdown (3600 seconds)
  const [timeLeft, setTimeLeft] = useState(3600);
  const [couponCode, setCouponCode] = useState('');
  const [redeemPoints, setRedeemPoints] = useState('');
  const [redeemText, setRedeemText] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.user?.user);
  const userMetadata = useSelector((s: RootState) => s.user?.user?.user?.metadata);

  const cartItems = useSelector((s: RootState) => s.cart.cartItems);
  const subTotal = useSelector((s: RootState) => s.cart.subTotal);
  const total = useSelector((s: RootState) => s.cart.total);
  const shipping = useSelector((s: RootState) => s.cart.shipping);
  const tax = useSelector((s: RootState) => s.cart.tax);
  const discount = useSelector((s: RootState) => s.cart.discount);
  const appliedCoupon = useSelector((s: RootState) => s.cart.couponCode);
  const fitCouponData = useSelector((s: RootState) => s.cart.fitCouponData);
  const products = useGetProductsQuery(null);
  const { shippingFee } = useCartLogic();
  const [action] = useCreateOrderMutation();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);
 console.log("some")
  // Format time for display
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const formattedTime = formatTime(timeLeft);

  // Handle coupon submission
  const handleCouponSubmit = async () => {
    if (!couponCode.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Voer een kortingscode in',
      });
      return;
    }

    // Normalize coupon codes like web version
    const normalizedCode = couponCode.toLowerCase();
    let finalCode = normalizedCode;
    
    if (['freesnack', 'summerfit', 'willem', 'mama', 'summer', 'father', 'fit'].includes(normalizedCode)) {
      finalCode = normalizedCode;
    }

    try {
      const response = await fetch(`${baseUrl}/api/coupons/validate/${finalCode}?userId=${user?.user?._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Calculate discount directly from API response
        const couponFromAPI = data.coupon;
        let calculatedDiscount = 0;
        const baseOrderValue = Object.values(cartItems).reduce((total: number, item: any) => {
          return total + item.quantity * Number(item.metadata._price);
        }, 0);

        if (couponFromAPI.code === "fit") {
          calculatedDiscount = 20; // Default fit coupon discount
          if (couponFromAPI.freeShipping) {
            calculatedDiscount += shippingFee; // Add dynamic shipping cost
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
        dispatch(setDiscount(calculatedDiscount));
        dispatch(setCoupon(couponFromAPI));
        setCouponCode('');

        Toast.show({
          type: 'success',
          text1: 'Kortingscode toegepast',
          text2: 'Korting is toegepast op je bestelling',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Kortingscode is ongeldig',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Er is een fout opgetreden',
        text2: 'Probeer het opnieuw',
      });
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    dispatch(setDiscount(0));
    dispatch(setCoupon(null));
    setCouponCode('');
    
    Toast.show({
      type: 'success',
      text1: 'Kortingscode verwijderd',
    });
  };

  // Handle point redemption
  const handleRedeemPoints = () => {
    const points = parseInt(redeemPoints);
    if (points < 100) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 100 punten vereist',
      });
      return;
    }

    const pointValue = points * 0.03;
    setRedeemText(pointValue);
    Toast.show({
      type: 'success',
      text1: `${points} punten ingewisseld voor €${pointValue.toFixed(2)}`,
    });
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return Object.values(cartItems).reduce((total: number, item: any) => {
      return total + (Number(item.metadata._price) * (item.quantity || 1));
    }, 0);
  };

  const calculateSupplementsTotal = () => {
    return Object.values(cartItems).reduce((total: number, item: any) => {
      if (item.categories?.includes('Supplements')) {
        return total + Number(item.metadata._price) * (item.quantity || 1);
      }
      return total;
    }, 0);
  };

  const calculateFinalPrice = () => {
    const subtotal = calculateSubtotal();
    return subtotal + shippingFee + tax - discount - redeemText;
  };

  // Calculate loyalty points (example: 1 point per euro spent)
  const loyaltyPoints = Math.floor(calculateFinalPrice());



  // Handle final payment
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      console.log('Starting payment process...');
      console.log('User:', user);
      console.log('Cart items:', cartItems);
      console.log('Order data will be created...');
      
      if (!user?.user?._id) {
        Toast.show({
          type: 'error',
          text1: 'Geen gebruiker gevonden',
          text2: 'Log in om door te gaan',
        });
        setIsLoading(false);
        return;
      }

      // Process cart items in the same format as web checkout
      var arr: any[] = [];
      var contracts = false;
      
      Object.values(cartItems).forEach((i: any) => {
        var productString = null;
        
        if (i.categories.includes("Pakket Samenstellen")) {
          var productCounts = i.selectedItems.reduce((acc: any, it: any) => {
            acc[it.productId] = (acc[it.productId] || 0) + 1;
            return acc;
          }, {});

          productString = Object.entries(productCounts)
            .map(([productId, quantity]) => `${productId}:${quantity}`)
            .join(",");
        }
        
        // Helper function to get weight (simplified version)
        const getWeight = (product: any) => {
          if (product.metadata?.nutretions_data?.weight) {
            return product.metadata.nutretions_data.weight;
          }
          return 500; // default weight
        };
        
        var thumbnail = `${baseUrl}/uploads/${i?.files?.length > 0 ? i?.files[0]?.url : i?.thumbnail?.url || ""}`;
        
        if (i.categories.includes("Smakelijke maaltijden")) {
          // For meals, use the product as is since we don't have the products array in RN

          const prod = products.currentData?.nonSubscribedProducts?.find((produ: any) => produ.name.includes(i.name) && produ.name.startsWith(i.selectedWeight.weight.toString() == "320" ? "Afvallen" : i.selectedWeight.weight.toString() == "400" ? "Droogtrainen" : "Spiermassa")) || i

          var thumb = `${process.env.NEXT_PUBLIC_BACKEND_URI}/uploads/${prod?.files?.length > 0 ? prod?.files[0]?.url : prod?.thumbnail?.url || ""}`
          arr.push({ 
              "order_item_name": prod.name, 
              "meta": { 
                  "_qty": i.quantity, 
                  "_line_total": prod.metadata?._price * i.quantity, 
                  "_weight": null, 
                  "_id": i._id, 
                  "_cartstamp": i.metadata?._yith_wcpb_bundle_data !== 's:0:"";' ? (i.metadata?._yith_wcpb_bundle_data || null) : null, 
                  "_asnp_wepb_items": productString || null, 
                  "_thumbnail": thumb,
                  categories: i.categories[0]
              } 
          })
        } else {
          arr.push({ 
            "order_item_name": i.name, 
            "meta": { 
              "_qty": i.quantity, 
              "_line_total": Number(i.metadata?._price) * i.quantity, 
              "_weight": getWeight(i) / 1000, 
              "_id": i._id, 
              "_cartstamp": i.metadata?._yith_wcpb_bundle_data !== 's:0:"";' ? (i.metadata?._yith_wcpb_bundle_data || null) : null, 
              "_asnp_wepb_items": productString || null, 
              "_thumbnail": thumbnail, 
              categories: i.categories[0]
            } 
          });
        }
        
        if (i.categories.includes("Supplements")) {
          contracts = true;
        }
      });

      // Format date function
      const formatDateToYYYYMMDD = (dateInput: string) => {
        const date = new Date(dateInput);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Add prefix to form data keys (same as web)
      const addPrefixToKeys = (obj: any, prefix: string) => {
        return Object.entries(obj).reduce((acc: any, [key, value]) => {
          acc[`${prefix}${key}`] = value;
          return acc;
        }, {});
      };

      // Shipping tax calculation (same as web)
      const calculateShippingTax = (shipping: number) => {
        const taxRate = 0.21;
        const shippingTax = shipping - (shipping / (1 + taxRate));
        return shippingTax.toFixed(2);
      };

      // Order tax calculation (simplified version)
      const calculateOrderTax = () => {
        let totalTax = 0;
        
        Object.values(cartItems).forEach((item: any) => {
          const taxRate = item.categories[0] === "Accessories" ? 0.21 : 0.09;
          const itemPrice = Number(item.metadata._price);
          const itemBasePrice = itemPrice / (1 + taxRate);
          const taxAmount = itemPrice - itemBasePrice;
          totalTax += item.quantity * taxAmount;
        });

        return totalTax.toFixed(2);
      };

      // PayNL method mapping (same as web)
      const paynlMethodMap: { [key: string]: number } = {
        ideal: 10,
        klarna: 1717,
        idealin3: 1813,
        bancontact: 436,
        creditcard: 706,
        paypal: 138,
        googlewallet: 2558,
      };

      // Prepare user data with prefix (same as web)
      var userData = checkoutFormData?.billing_email ? addPrefixToKeys(checkoutFormData, "_") : {};

      // Calculate total weight
      const calculateTotalWeight = () => {
        return Object.values(cartItems).reduce((totalWeight: number, item: any) => {
          const weight = item.metadata?.nutretions_data?.weight || 500;
          return totalWeight + item.quantity * weight;
        }, 0);
      };

      // Create order data in exact same format as web
      var orderData = {
        user_id: user.user._id,
        total: calculateFinalPrice().toFixed(2),
        totalWeight: calculateTotalWeight() / 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          _cart_discount: discount + redeemText, 
          ...userData, 
          _delivery_date: checkoutFormData?.deliveryDate ? formatDateToYYYYMMDD(checkoutFormData.deliveryDate) : new Date().toISOString().split('T')[0], 
          _delivery_company: "trunkrs", 
          deliveryMethod: 2801,
          _order_shipping: (shippingFee - parseFloat(calculateShippingTax(shippingFee))).toFixed(2),
          _order_shipping_tax: calculateShippingTax(shippingFee),
          _order_tax: calculateOrderTax(),
          _order_total: calculateFinalPrice(),
          _supplements_total: calculateSupplementsTotal(),
          _prioritized_order: false,
          _prioritized_fee: 0,
          discountsData: { redeemPoints: redeemText > 0 ? parseInt(redeemPoints) : 0 },
          contracts: contracts,
          _payment_method_id: paynlMethodMap[checkoutFormData?.paymentMethod || 'ideal']
        },
        items: arr,
        ipAddress: '127.0.0.1' // Default IP for mobile
      };

      console.log('Creating order with body:', orderData);

      const response = await action({
        body: orderData,
        token: user.token || '',
      }).unwrap();

      console.log('Order created successfully:', response);

      if (response.paymentUrl) {
        console.log('Redirecting to payment:', response.paymentUrl);
        router.push({
          pathname: '/verifypayment-product/verifyPayment',
          params: {
            redirectUrl: response.paymentUrl,
          },
        });
      } else {
        // Fallback - go to order placed page
        router.push({
          pathname: '/orderplaced',
          params: {
            status: 'success',
            type: subsType === 'upgrade' ? 'upgrade' : 'subscription',
          },
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      Toast.show({
        type: 'error',
        text1: 'Betalingsfout',
        text2: error?.data?.error || 'Er is iets misgegaan bij de betaling',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get product image URL
  const getProductImageUrl = (item: any) => {
    if (item.files?.length > 0) {
      return `${baseUrl}/uploads/${item.files[0].url}`;
    }
    return item.thumbnail?.url || 'https://via.placeholder.com/80x80';
  };

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack px="$4" gap="$5" pb="$8">
          {/* Countdown Timer */}
          <YStack gap="$3" p="$4" borderRadius={12} backgroundColor="#FFF9F7" borderWidth={1} borderColor="#FD4F01">
            <Text fontSize={14} fontWeight="600" color="#FD4F01" textAlign="center">
              Je producten wachten op jou ⏳
            </Text>
            <Text fontSize={12} color="#666" textAlign="center">
              Je hebt nog even de tijd om jouw bestelling te voltooien. Daarna kunnen we de items opnieuw beschikbaar maken in de shop.
            </Text>
            <XStack justifyContent="center" alignItems="center" gap="$2">
              <YStack alignItems="center">
                <Text fontSize={20} fontWeight="700" color="#FD4F01">
                  {formattedTime.days}
                </Text>
                <Text fontSize={12} color="#666">Dagen</Text>
              </YStack>
              <Text fontSize={16} color="#666">:</Text>
              <YStack alignItems="center">
                <Text fontSize={20} fontWeight="700" color="#FD4F01">
                  {formattedTime.hours}
                </Text>
                <Text fontSize={12} color="#666">Uren</Text>
              </YStack>
              <Text fontSize={16} color="#666">:</Text>
              <YStack alignItems="center">
                <Text fontSize={20} fontWeight="700" color="#FD4F01">
                  {formattedTime.minutes}
                </Text>
                <Text fontSize={12} color="#666">Minuten</Text>
              </YStack>
              <Text fontSize={16} color="#666">:</Text>
              <YStack alignItems="center">
                <Text fontSize={20} fontWeight="700" color="#FD4F01">
                  {formattedTime.seconds}
                </Text>
                <Text fontSize={12} color="#666">Seconden</Text>
              </YStack>
            </XStack>
          </YStack>

          {/* Coupon Section */}
          <YStack gap="$3">
            <Text fontSize={16} fontWeight="700" color="#1E1F20">
              Kortingscode
        </Text>
            {!appliedCoupon ? (
              <XStack gap="$3">
                <Input
                  flex={1}
                  value={couponCode}
                  onChangeText={setCouponCode}
                  placeholder="Voer je kortingscode in"
                  backgroundColor="white"
                  borderColor="#EDEEF1"
                  borderRadius={8}
          borderWidth={1}
                  py={10}
                />
                <Button
                  onPress={handleCouponSubmit}
                  backgroundColor="#FD4F01"
                  color="white"
                  borderRadius={8}
                  fontWeight="700"
                  px="$4">
                  Toepassen
                </Button>
              </XStack>
            ) : (
              <XStack
                justifyContent="space-between" 
                alignItems="center"
                p="$3" 
                backgroundColor="#F0FDF4" 
                borderRadius={8}
                borderWidth={1}
                borderColor="#BBF7D0">
                <XStack alignItems="center" gap="$2">
                  <Text fontSize={14} color="#15803D" fontWeight="600">
                    ✅ {appliedCoupon.code.toUpperCase()}
                  </Text>
                  <Text fontSize={12} color="#15803D">
                    (€{discount.toFixed(2)} korting)
                  </Text>
                </XStack>

                <TouchableOpacity onPress={handleRemoveCoupon}>
                  <Text fontSize={14} color="#EF4444" fontWeight="700">
                    Verwijderen
                  </Text>
                </TouchableOpacity>
              </XStack>
            )}
          </YStack>

          {/* Redeem Points Section */}
          {userMetadata?.woocommerce_reward_points && parseInt(userMetadata?.woocommerce_reward_points) > 0 && (
            <YStack gap="$3">
              <Text fontSize={16} fontWeight="700" color="#1E1F20">
                Fit Preps Points
              </Text>
              <Text fontSize={14} color="#666">
                Je hebt {userMetadata?.woocommerce_reward_points} punten ter waarde van{' '}
                <Text fontWeight="700" color="#FD4F01">
                  {/* @ts-ignore */}
                  €{parseFloat(parseInt(userMetadata.woocommerce_reward_points) * 0.03).toFixed(2)}
                </Text>
              </Text>
              <XStack gap="$3">
                  <Input
                  flex={1}
                  value={redeemPoints}
                  onChangeText={setRedeemPoints}
                  placeholder="Voer punten in om in te wisselen"
                  keyboardType="number-pad"
                    backgroundColor="white"
                    borderColor="#EDEEF1"
                    borderRadius={8}
                    borderWidth={1}
                  py={10}
                />
                <Button
                  onPress={handleRedeemPoints}
                  backgroundColor="#009A21"
                  color="white"
                  borderRadius={8}
                  fontWeight="700"
                  px="$4">
                  Inwisselen
                </Button>
                  </XStack>
            </YStack>
          )}

          {/* Cart Items */}
          {/* <YStack gap="$3">
            <Text fontSize={16} fontWeight="700" color="#1E1F20">
              Jouw bestelling
            </Text>
            {Object.values(cartItems).map((item: any, index) => (
              <XStack key={index} gap="$3" p="$3" backgroundColor="white" borderRadius={8} borderWidth={1} borderColor="#EDEEF1">
                <Image 
                  source={{ uri: getProductImageUrl(item) }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
                <YStack flex={1} gap="$1">
                  <Text fontSize={14} fontWeight="600" color="#1E1F20" numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text fontSize={14} color="#FD4F01" fontWeight="700">
                    {formatPrice(Number(item.metadata._price))}
                  </Text>
                </YStack>
                <YStack alignItems="center" justifyContent="center">
                  <Text fontSize={14} fontWeight="700" color="#1E1F20">
                    {item.quantity}x
                  </Text>
                </YStack>
              </XStack>
            ))}
          </YStack> */}

          {/* Order Totals */}
          <YStack borderTopWidth={1} borderTopColor="#EDEEF1" pt="$3" gap="$2">
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#666">Subtotaal</Text>
              <Text fontSize={14} fontWeight="600">{formatPrice(calculateSubtotal())}</Text>
            </XStack>
{/* 
            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#666">Supplements</Text>
              <Text fontSize={14} fontWeight="600">{formatPrice(calculateSupplementsTotal())}</Text>
            </XStack> */}

            <XStack justifyContent="space-between">
              <Text fontSize={14} color="#666">Verzendkosten</Text>
              <Text fontSize={14} fontWeight="600">{formatPrice(shippingFee)}</Text>
            </XStack>

            {appliedCoupon && discount > 0 && (
              <XStack justifyContent="space-between">
                <Text fontSize={14} color="#666">Korting ({appliedCoupon.code})</Text>
                <Text fontSize={14} fontWeight="600" color="#009A21">
                  -{formatPrice(discount)}
                </Text>
              </XStack>
            )}

            {redeemText > 0 && (
              <XStack justifyContent="space-between">
                <Text fontSize={14} color="#666">Punten ingewisseld</Text>
                <Text fontSize={14} fontWeight="600" color="#009A21">
                  -{formatPrice(redeemText)}
                </Text>
              </XStack>
            )}

            <XStack justifyContent="space-between">
              <Text fontSize={16} fontWeight="700" color="#1E1F20">TOTAAL</Text>
              <Text fontSize={16} fontWeight="700" color="#FD4F01">
                {formatPrice(calculateFinalPrice())}
              </Text>
            </XStack>

            <XStack justifyContent="space-between">
              <Text fontSize={12} color="#666">Inclusief {formatPrice(tax)} BTW</Text>
              <Text fontSize={12} color="#666"></Text>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={14} color="#666">Loyaliteitspunten</Text>
              <XStack alignItems="center" gap="$1">
                <Text fontSize={14} fontWeight="600" color="#FD4F01">+{loyaltyPoints}</Text>
                <Text fontSize={12}>🔥</Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Payment Button */}
      <XStack p="$4" borderTopWidth={1} borderTopColor="#EDEEF1" backgroundColor="white">
        <Button
          flex={1}
          onPress={handlePayment}
          backgroundColor="#FD4F01"
          borderRadius={8}
          fontSize={16}
          fontWeight="700"
          color="white"
          disabled={isLoading}
          height={50}>
          {isLoading ? (
          <XStack alignItems="center" gap="$2">
              <Spinner size="small" color="white" />
              <Text color="white" fontWeight="700">Verwerken...</Text>
            </XStack>
          ) : (
            'Nu Betalen'
          )}
        </Button>
          </XStack>
    </SafeAreaView>
  );
}



