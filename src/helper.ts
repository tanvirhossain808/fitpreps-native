import {
  activeMealsStatusBarColor,
  cookdFilter,
  cookdFoodCategories,
  fueldFilter,
  fueldSelectedCategories,
  shapedSelecteCategories,
  sliderData,
  suppdFilter,
  suppdSelectedCategories,
} from './constant';
import { Productsmakelijke, SliderItem } from './types/type';

export const activeStatsBarInfo = (product: string) =>
  activeMealsStatusBarColor.find((data) => data.name === product);

export const selectSuppdProductType = (product: string) => {
  if (product === 'cookd') {
    return cookdFoodCategories;
  } else if (product === 'fueld') {
    return fueldSelectedCategories;
  } else if (product === 'suppd') {
    return suppdSelectedCategories;
  } else if (product === 'shaped') {
    return shapedSelecteCategories;
  } else {
    return cookdFoodCategories;
  }
};
export const filterItems = (productType: string) => {
  if (productType === 'cookd') {
    return cookdFilter;
  } else if (productType === 'fueld') {
    return fueldFilter;
  } else if (productType === 'suppd') {
    return suppdFilter;
  }
  return [];
};

export const truncateText = (text: string, length: number = 19) => {
  if (text.length > length) {
    return text.substring(0, 19) + '...';
  }
  return text;
};
type ProductItem = Productsmakelijke | SliderItem;

export const productRows = (products: ProductItem[]) => {
  let rows = [];
  for (let i = 0; i < products.length; i += 2) {
    const chunk = products.slice(i, i + 2);
    rows.push(chunk);
  }
  rows.splice(2, 0, [sliderData as SliderItem]);
  return rows as (Productsmakelijke | SliderItem)[][];
};
