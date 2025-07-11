import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCategory, setSortBy, setGender, resetFilters } from '../store/slices/filterSlice';
import { Productsmakelijke, SortOption } from '../types/type';
import { productRows } from '../helper';
import { sliderData } from '../constant';
import Sortby from '../components/shared/Sortby';

const useProductFilters = (initialProducts: Productsmakelijke[] = []) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  console.log(filters, 'filtersdd');
  const filteredProducts = useMemo(() => {
    if (!initialProducts.length) return [];

    let products = [...initialProducts];

    if (filters.category?.toLowerCase() !== 'alle') {
      products = products.filter(
        (item) => item.categories[1]?.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.filters?.price?.length) {
      const selectedPriceRanges = filters.filters.price;
      products = products.filter((product) => {
        return product.metadata?.weight_options?.some((option) => {
          const productPrices =
            product.metadata?.weight_options?.map((option) => parseFloat(option.price)) || [];
          return selectedPriceRanges.some((range) => {
            switch (range) {
              case '€0 - €10':
                return productPrices.some((price) => price >= 0 && price <= 10);
              case '€10 - €20':
                return productPrices.some((price) => price > 10 && price <= 20);
              case '€20 - €50':
                return productPrices.some((price) => price > 20 && price <= 50);
              case '€50 - €100':
                return productPrices.some((price) => price > 50 && price <= 100);
              case '€100+':
                return productPrices.some((price) => price > 100);
              default:
                return false;
            }
          });
        });
      });
    }

    return products;
  }, [initialProducts, filters]);

  // Apply sorting to products
  const applySorting = (products: Productsmakelijke[] = []) => {
    if (!products || products.length === 0) return [];

    const sortedProducts = [...products];
    console.log('sort');
    switch (filters.sortBy) {
      case 'price_asc':
        sortedProducts.sort((a, b) => {
          const aPrice = Math.min(
            ...(a.metadata?.weight_options?.map((opt) => parseFloat(opt.price)) || [0])
          );
          const bPrice = Math.min(
            ...(b.metadata?.weight_options?.map((opt) => parseFloat(opt.price)) || [0])
          );
          return aPrice - bPrice;
        });
        break;
      case 'price_desc':
        sortedProducts.sort(
          (a, b) =>
            parseFloat(b.metadata?.weight_options[0].price) -
            parseFloat(a.metadata?.weight_options[0].price)
        );
        break;
      case 'recent':
        sortedProducts.sort((a, b) => {
          const aDate = new Date(a.createdAt).getTime();
          const bDate = new Date(b.createdAt).getTime();
          console.log(bDate - aDate, 'df');
          return bDate - aDate;
        });
        break;
      case 'oldest':
        sortedProducts.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        return sortedProducts;
    }
    return sortedProducts;
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = [...filteredProducts];
    const sorted = applySorting(filtered);
    // console.log('hey');
    if (sorted.length >= 4) {
      // 4 or more products: show first 4, then slider
      return [
        ...sorted.slice(0, 4),
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
        ...sorted.slice(4),
      ];
    } else if (sorted.length === 3) {
      // 3 products: add dummy to make 4, then slider
      return [
        ...sorted,
        {
          id: 'dummy1',
          type: 'dummy1',
        },
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
        ...sorted.slice(3),
      ];
    } else if (sorted.length === 2) {
      return [...sorted, { ...sliderData }, ...sorted.slice(2), { id: 'dummy', type: 'dummy' }];
    } else if (sorted.length === 1) {
      return [
        sorted[0],
        { id: 'dummy1', type: 'dummy1' },
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
      ];
    } else {
      return [{ ...sliderData }, { id: 'dummy', type: 'dummy' }];
    }
  }, [filteredProducts, filters.sortBy]);

  // Action creators
  const updateCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  const updateSortBy = (sortOption: SortOption) => {
    dispatch(setSortBy(sortOption));
  };

  const updateGender = (gender: 'male' | 'female' | null) => {
    dispatch(setGender(gender));
  };

  const resetAllFilters = () => {
    dispatch(resetFilters());
  };

  return {
    // State
    filters,
    filteredProducts: filteredAndSortedProducts,

    // Actions
    updateCategory,
    updateSortBy,
    updateGender,
    resetAllFilters,
  };
};

export default useProductFilters;
