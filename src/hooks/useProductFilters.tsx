import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setCategory,
  setPriceRange,
  setSortBy,
  setGender,
  resetFilters,
} from '../store/slices/filterSlice';
import { Productsmakelijke } from '../types/type';
import { productRows } from '../helper';

type SortOption = 'price_asc' | 'price_desc' | 'recent' | 'oldest';

const useProductFilters = (initialProducts: Productsmakelijke[] = []) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const filteredProducts = useMemo(() => {
    if (!initialProducts.length) return [];
    let products = [];
    if (filters.category?.toLowerCase() === 'alle') {
      products = [...initialProducts];
    } else {
      const filtered = initialProducts.filter(
        (item) => item.categories[1]?.toLowerCase() === filters.category?.toLowerCase()
      );
      products = [...filtered];
    }
    return products;
  }, [initialProducts, filters.category]);
  // Apply filters to products
  const applyFilters = (products: Productsmakelijke[] = []) => {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      // Apply category filter
      //   if (filters.category && product.categories?.includes(filters.category)) {
      //     return true;
      //   }

      // Apply price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.map((val) =>
          val === '100+' ? Infinity : Number(val)
        );

        const hasMatchingPrice = product.metadata?.weight_options?.some((option) => {
          const price = parseFloat(option.price);
          return max === Infinity
            ? price >= min // For "100+", only check if price >= min
            : price >= min && price <= max; // For normal
        });

        if (!hasMatchingPrice) {
          return false;
        }
      }

      // Apply gender filter
      //   if (filters.gender && product.gender !== filters.gender) {
      //     return false;
      //   }

      return true;
    });
  };

  // Apply sorting to products
  const applySorting = (products: Productsmakelijke[] = []) => {
    if (!products || products.length === 0) return [];

    const sortedProducts = [...products];

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
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
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

  // Combined filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = applyFilters(filteredProducts);
    const sorted = applySorting(filtered);
    return productRows(filteredProducts);
  }, [filteredProducts, filters]);

  // Action creators
  const updateCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  const updatePriceRange = (priceRange: [number, number]) => {
    dispatch(setPriceRange(priceRange));
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
    updatePriceRange,
    updateSortBy,
    updateGender,
    resetAllFilters,
  };
};

export default useProductFilters;
