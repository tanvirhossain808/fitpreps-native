import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { cartTax, supplementsTotal, totalPrice, totalWeight } from '../utils/cartCalculations';
import {
  decrement,
  increment,
  removeItem,
  setCoupon,
  setShipping,
  setTotal,
} from '../store/slices/cartSlice';

export function useCartLogic() {
  const dispatch = useDispatch();
  const { cartItems, couponCode: coupon, discount } = useSelector((s: RootState) => s.cart);
  const user = useSelector((s: RootState) => s.user.user);

  /* ---------- derived numbers ---------- */
  const sub = useMemo(() => totalPrice(Object.values(Object.values(cartItems))), [cartItems]);
  const weight = useMemo(() => totalWeight(Object.values(Object.values(cartItems))), [cartItems]);
  const tax = useMemo(() => cartTax(Object.values(Object.values(cartItems))), [cartItems]);
  const supps = useMemo(
    () => supplementsTotal(Object.values(Object.values(cartItems))),
    [cartItems]
  );
  const totalPice = useMemo(() => sub + tax + supps, [sub, tax, supps]);
  console.log(supps, 'supps');
  console.log(sub, 'sub');
  console.log(tax, 'tax');
  console.log(discount, 'discount');
  console.log(weight, 'weight');
  //   console.log(shippingFee, 'shippingFee');
  /* ---------- business rules ---------- */
  const shippingFee = useMemo(() => {
    if (sub > 125) return 0;
    const country = user?.user?.metadata?.shipping_country ?? 'NL';
    return country === 'BE' ? 8.95 : 6.95;
  }, [sub, user]);

  const final = useMemo(
    () => Math.max(0, sub + shippingFee - discount),
    [sub, shippingFee, discount]
  );

  /* ---------- action helpers ---------- */
  const inc = useCallback((id: string) => dispatch(increment(id)), [dispatch]);
  const dec = useCallback((id: string) => dispatch(decrement(id)), [dispatch]);
  const del = useCallback((id: string) => dispatch(removeItem(id)), [dispatch]);
  const total = useMemo(() => sub + tax + supps + shippingFee, [sub, tax, supps, shippingFee]);
  const setCouponCode = useCallback((code: string) => dispatch(setCoupon(code)), [dispatch]);
  useEffect(() => {
    dispatch(setTotal(total));
  }, [total, dispatch]);
  const updateShipping = useCallback((fee: number) => dispatch(setShipping(fee)), [dispatch]);

  // const applyCoupon = useCallback((code: string) => dispatch(applyCouponAsync(code)), [dispatch]);

  // const placeOrder = useCallback(
  //   () =>
  //     dispatch(
  //       placeOrderAsync({
  //         items,
  //         userId: user._id,
  //         total: final,
  //         weight,
  //         tax,
  //         discount,
  //         shipping: shippingFee,
  //       })
  //     ),
  //   [dispatch, items, user, final, weight, tax, discount, shippingFee]
  // );

  return {
    items: Object.values(cartItems),
    sub,
    tax,
    total,
    shippingFee,
    discount,
    final,
    inc,
    dec,
    del,
    setCouponCode,
    updateShipping,
    // applyCoupon,
    // placeOrder,
  };
}
