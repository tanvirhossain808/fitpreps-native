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
