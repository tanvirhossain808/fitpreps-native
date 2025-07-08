import { useMemo } from 'react';
import { fueldOrSliderItem, Productsmakelijke, SliderItem, suppd } from '~/src/types/type';
import { sliderData } from '../constant';

type ProductItem = Productsmakelijke | SliderItem;

export const useProductRows = (products: ProductItem[]) => {
  const data = useMemo(() => {
    let rows = [];
    for (let i = 0; i < products.length; i += 2) {
      const chunk = products.slice(i, i + 2);
      rows.push(chunk);
    }
    rows.splice(2, 0, [sliderData as SliderItem]);
    return rows;
  }, [products]);
  return data;
};
