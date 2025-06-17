import {
  activeMealsStatusBarColor,
  cookdFilter,
  cookdFoodCategories,
  fueldFilter,
  fueldSelectedCategories,
  suppdFilter,
  suppdSelectedCategories,
} from './constant';

export const activeStatsBarInfo = (product: string) =>
  activeMealsStatusBarColor.find((data) => data.name === product);

export const selectSuppdProductType = (product: string) => {
  if (product === 'cookd') {
    return cookdFoodCategories;
  } else if (product === 'fueld') {
    return fueldSelectedCategories;
  } else if (product === 'suppd') {
    return suppdSelectedCategories;
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
