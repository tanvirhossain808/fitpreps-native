import { ImageSourcePropType } from 'react-native';

export type FoodOfItem = {
  type: 'food';
  id: number;
  name: string;
  img: ImageSourcePropType;
  price:
    | {
        quantity: string;
        price: string;
      }[]
    | string;
  badge?: string;
};

export type SliderImage = {
  img: ImageSourcePropType;
  caption: string;
  title: string;
  text: string;
  id: number;
};

export type SliderItem = {
  type: 'slider';
  id: string;
  _id: string;
  images: SliderImage[];
};

export type FoodOrSliderItem = FoodOfItem | SliderItem;

export type fueld = {
  type: 'food';
  id: number;
  name: string;
  img: ImageSourcePropType;
  price: string;
  badge: string;
  calories: string;
  weight: string;
  protein: string;
  subBadge: string;
};
export type suppd = Omit<fueld, 'type'> & {
  type: 'product';
};
export type fueldOrSliderItem = fueld | SliderItem;
export type suppdOrSlider = suppd | SliderItem;
export type FilterOption = {
  name: string;
  filterOption: string[];
  bg: string;
  border: string;
};

export interface GymProduct {
  badge: string;
  img: any;
  badgeBg: string;
  color: string;
  subBadgeBg: string;
  subBadgeColor: string;
  subBadge: string;
  ratings: string;
  name: string;
  price: string;
  discount: string;
}

export type AppRoute =
  | '/(navigator)/index'
  | '/(navigator)/(tabs)/index'
  | '/(navigator)/(tabs)/cart'
  | '/(navigator)/(tabs)/orders'
  | '/(navigator)/my-profile'
  | '/(navigator)/manage-subscription'
  | '/(navigator)/addresses'
  | '/(navigator)/payment-methods'
  | '/(navigator)/contact-us'
  | '/(navigator)/faqs'
  | '/(navigator)/settings';

export type FaqCategory = {
  name: string;
  faqs: {
    question: string;
    answer: string;
  }[];
};

export type Productsmakelijke = {
  type?: string;
  _id: string;
  productId: number;
  name: string;
  quantity?: number;
  description: string;
  status: string;
  createdAt: string;
  thumbnail: {
    id: number;
    url: string;
  };
  categories: string[];
  metadata: {
    _price: string;
    _product_background_color: string;
    _stock: string;
    nutretions_data: any;
    producten_specificaties_data: string;
    total_sales: string;
    voedingswaarde_data: {
      voedingswaarde_heading: string;
      voedingswaarde_contents: string;
    }[];
    _yith_wcpb_bundle_data: string;
    _freezer: string;
    allergenen: string[];
    badges: string[];
    weight_options: {
      weight: string;
      price: string;
    }[];
  };
  files: {
    url: string;
  }[];
  eiwitten: string;
  selectedWeight?: {
    weight: string;
    price: string;
  };
};

export type SortOption = 'price_asc' | 'price_desc' | 'recent' | 'oldest';

export type RegisterBody = {
  email: string;
  password: string;
  metadata: {
    first_name: string;
    last_name: string;
  };
};

export type LoginBody = {
  email: string;
  password: string;
};

export interface LoginResponse {
  message: string;
  token: string;
  user: UserType;
}

export type UserType = {
  _id: string;
  email: string;
  registeredAt: string;
  password: string;
  metadata: {
    first_name: string;
    last_name: string;
    woocommerce_reward_points: string;
    shipping_country?: string;
  };
};
export type cartType = { [key: string]: Productsmakelijke & { quantity: number } };

export type CouponTypes = {
  message: string;
  coupon: {
    _id: string;
    code: string;
    description: string;
    status: string;
    discountType: string;
    amount: string;
    freeShipping: boolean;
    usageLimit: string;
    usageCount: number;
    usageLimitPerUser: string;
    individualUse: boolean;
    excludeSaleItems: boolean;
    productIds: string;
    excludedProductIds: string;
    categoryIds: string;
    excludedCategoryIds: string;
    minimumAmount: string;
    maximumAmount: string;
    totalDiscount: any;
  };
};
export type Coupon = {
  _id: string;
  isBusiness?: boolean;
  code: string;
  description: string;
  status: string;
  discountType: string;
  amount: string;
  freeShipping: boolean;
  usageLimit: string;
  usageCount: number;
  usageLimitPerUser: string;
  individualUse: boolean;
  excludeSaleItems: boolean;
  productIds: string;
  excludedProductIds: string;
  categoryIds: string;
  excludedCategoryIds: string;
  minimumAmount: string;
  maximumAmount: string;
  totalDiscount: any;
};
