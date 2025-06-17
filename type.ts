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
