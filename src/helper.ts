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

export function phpUnserialize(data: string): any {
  let offset = 0;

  function readLength(): number {
    const sep = data.indexOf(':', offset);
    const len = parseInt(data.substring(offset, sep));
    offset = sep + 1;
    return len;
  }

  function readUntil(char: string): string {
    const sep = data.indexOf(char, offset);
    const result = data.substring(offset, sep);
    offset = sep + 1;
    return result;
  }

  function parse(): any {
    const type = data[offset++];

    offset++; // skip :

    switch (type) {
      case 'i': {
        const intVal = readUntil(';');
        return parseInt(intVal);
      }

      case 'b': {
        const boolVal = readUntil(';');
        return boolVal === '1';
      }

      case 'd': {
        const floatVal = readUntil(';');
        return parseFloat(floatVal);
      }

      case 'n': {
        readUntil(';');
        return null;
      }

      case 's': {
        const length = readLength();
        offset += 1; // skip "
        const strVal = data.substring(offset, offset + length);
        offset += length + 2; // skip string and closing ";
        return strVal;
      }

      case 'a': {
        const length = readLength();
        offset += 1; // skip {

        const result: any = {};
        for (let i = 0; i < length; i++) {
          const key = parse();
          const value = parse();
          result[key] = value;
        }

        offset++; // skip }
        return result;
      }

      default:
        throw new Error('Unsupported or unknown type: ' + type);
    }
  }

  return parse();
}
