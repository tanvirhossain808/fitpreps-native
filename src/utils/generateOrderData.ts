// -------------------------------------------------------------------------
//  Order‑data generator  —  100 % parity with original NewCartLayout.tsx
// -------------------------------------------------------------------------

/* ► 1.  Type declarations ------------------------------------------------ */
export interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  categories: string[];
  metadata: {
    _price: number; // unit price incl. VAT
    _yith_wcpb_bundle_data?: string;
    nutretions_data?: any;
  };
  thumbnail?: { url: string };
  files?: { url: string }[];
  selectedItems?: { productId: number }[]; // only for “Pakket Samenstellen”
}

export interface Coupon {
  code: string;
  discountType?: 'fixed_cart' | 'percent';
  amount?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  freeShipping?: boolean;
  isBusiness?: boolean; // disables loyalty points
}

export interface FitCouponData {
  discountAmount: number;
}

export interface UserMeta {
  shipping_country?: 'NL' | 'BE' | string;
  [k: string]: any;
}

export interface User {
  _id: string;
  email?: string;
  metadata: UserMeta;
}

export type Country = 'NL' | 'BE';

/* ► 2.  Helpers ---------------------------------------------------------- */
const isSerialized = (str?: string) => typeof str === 'string' && /^(a|O|s):/.test(str);

// rough weight fallback = 500 g
const optimizer = (p: CartItem) => {
  if (!p.metadata) return 500;
  if (p.metadata.nutretions_data && isSerialized(p.metadata.nutretions_data)) return 500;
  return p.metadata.nutretions_data?.weight ?? 500;
};

/* ► 3.  Main function ---------------------------------------------------- */
export function generateOrderData(params: {
  user: User;
  cart: CartItem[];
  coupon?: Coupon;
  fitCouponData?: FitCouponData;
  detectedCountry: Country;
}): {
  orderData: any;
  errors: string[];
  loyaltyPoints: number;
} {
  const { user, cart, coupon, fitCouponData, detectedCountry } = params;

  /* 1. Sub‑totals ------------------------------------------------------- */
  const totalWeight = cart.reduce((w, i) => w + i.quantity * optimizer(i), 0); // grams

  const totalCartIncl = cart.reduce((s, i) => s + i.quantity * i.metadata._price, 0);

  const supplementsIncl = cart.reduce((s, i) => {
    return i.categories.includes('Supplements') ? s + i.quantity * i.metadata._price : s;
  }, 0);
  const mealsIncl = totalCartIncl - supplementsIncl;

  /* 2. Shipping cost ---------------------------------------------------- */
  const shippingCountry: Country = (user.metadata.shipping_country as Country) || detectedCountry;

  const baseShipping = totalCartIncl > 125 ? 0 : shippingCountry === 'BE' ? 8.95 : 6.95;

  /* 3. Coupon discount -------------------------------------------------- */
  let discount = 0;
  let freeShipByCoupon = false;
  let couponMessage = '';

  if (coupon?.code) {
    const { discountType, amount, minimumAmount, maximumAmount, freeShipping, code } = coupon;

    if (code === 'fit') {
      discount += fitCouponData?.discountAmount ?? 0;
      if (freeShipping) freeShipByCoupon = true;
      couponMessage = 'Tiered percentage discount applied.';
    } else {
      if (minimumAmount && totalCartIncl < +minimumAmount) {
        couponMessage = `Minimum order €${minimumAmount}`;
      } else {
        switch (discountType) {
          case 'fixed_cart':
            discount = +amount!;
            break;
          case 'percent':
            discount = (totalCartIncl * +amount!) / 100;
            break;
        }
        if (maximumAmount) discount = Math.min(discount, +maximumAmount);
        if (freeShipping) freeShipByCoupon = true;
        if (code === 'freesnack' && totalCartIncl < 80) {
          couponMessage = '80 € vereist om freesnack te gebruiken';
        }
      }
    }
  }

  /* discount share for supplements (keeps behaviour identical) */
  if (supplementsIncl > 0 && discount > 0) {
    const ratio = supplementsIncl / totalCartIncl;
    /* resulting suppShare = discount * ratio — not used elsewhere,
         but original component only reduced supplements stats,
         not the discount value itself, so we keep it noop */
  }

  /* 4. Final shipping after coupon ------------------------------------- */
  let shippingCost = baseShipping;
  if (freeShipByCoupon) {
    discount += baseShipping; // 1‑line parity patch
    shippingCost = 0;
  }

  /* 5. VAT (per‑item loop for cent‑perfect precision) ------------------ */
  let totalVAT = 0;
  cart.forEach((i) => {
    const rate = i.categories[0] === 'Accessories' ? 0.21 : 0.09;
    const price = i.metadata._price * i.quantity;
    totalVAT += price - price / (1 + rate);
  });
  totalVAT = +totalVAT.toFixed(2);

  const shippingVAT = +(shippingCost - shippingCost / 1.21).toFixed(2);

  /* 6. Gross total ------------------------------------------------------ */
  const grossTotal = +(totalCartIncl + shippingCost - discount).toFixed(2);

  /* 7. Build line‑items ------------------------------------------------- */
  const items = cart.map((i) => {
    let asnp: string | null = null;
    if (i.categories.includes('Pakket Samenstellen')) {
      const counts =
        i.selectedItems?.reduce<Record<string, number>>((acc, p) => {
          acc[p.productId] = (acc[p.productId] || 0) + 1;
          return acc;
        }, {}) ?? {};
      asnp = Object.entries(counts)
        .map(([id, q]) => `${id}:${q}`)
        .join(',');
    }

    return {
      order_item_name: i.name,
      meta: {
        _qty: i.quantity,
        _line_total: i.metadata._price * i.quantity,
        _weight: optimizer(i) / 1000,
        _id: i._id,
        _bundled_items: i.metadata._yith_wcpb_bundle_data ?? null,
        _asnp_wepb_items: asnp,
      },
    };
  });

  /* 8. Assemble orderData ---------------------------------------------- */
  const orderData = {
    user_id: user._id,
    total: grossTotal.toFixed(2),
    totalWeight: +(totalWeight / 1000).toFixed(3),
    createdAt: new Date(),
    updatedAt: new Date(),
    metadata: {
      _cart_discount: +discount.toFixed(2),
      _order_shipping: +(shippingCost - shippingVAT).toFixed(2),
      _order_shipping_tax: shippingVAT,
      _order_tax: totalVAT,
      _order_total: grossTotal,
    },
    items,
  };

  /* 9. Errors / warnings ----------------------------------------------- */
  const errors: string[] = [];
  if (mealsIncl > 0 && mealsIncl < 45)
    errors.push('De minimale bestelwaarde voor maaltijden is €45');
  if (couponMessage) errors.push(couponMessage);

  const loyaltyPoints = coupon?.isBusiness ? 0 : Math.floor(grossTotal);

  return { orderData, errors, loyaltyPoints };
}
