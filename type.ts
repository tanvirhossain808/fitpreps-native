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
