import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { GymwearProduct } from '../types/type';

const useGymwearFilters = (initialProducts: GymwearProduct[] = []) => {
  const category = useSelector((s: RootState) => s.filter.category);
  const sortBy = useSelector((s: RootState) => s.filter.sortBy);
  const search = useSelector((s: RootState) => s.filter.search);
  const price = useSelector((s: RootState) => s.filter.filters.price);

  /* ───────────────────────── SEARCH ───────────────────────── */
  const searchProducts = useMemo(() => {
    if (!search) return initialProducts;
    return initialProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [initialProducts, search]);

  /* ───────────────────────── CATEGORY ───────────────────────── */
  const productsByCategory = useMemo(() => {
    if (!category || category.toLowerCase() === 'alle' || category.toLowerCase() === 'alle gymwear') return searchProducts;
    
    // Map category names to match gymwear categories
    const categoryMap: { [key: string]: string } = {
      'alle gymwear': 'alle gymwear',
      'alle': 'alle gymwear',
      'tops': 'tops',
      'bra\'s': 'bras',
      'bras': 'bras',
      'leggings': 'leggings',
      'shorts': 'shorts'
    };
    
    const mappedCategory = categoryMap[category.toLowerCase()];
    if (!mappedCategory) return searchProducts;
    
    return searchProducts.filter((p) => {
      if (mappedCategory === 'alle gymwear' || mappedCategory === 'alle') return true;
      return p.category.toLowerCase() === mappedCategory;
    });
  }, [category, searchProducts]);

  /* ───────────────────────── PRICE FILTER ───────────────────── */
  const filteredProducts = useMemo(() => {
    if (!productsByCategory.length) return [];
    if (!price?.length) return productsByCategory;

    const ranges = price;
    return productsByCategory.filter((product) => {
      const productPrice = parseFloat(product.metadata._price || '0');
      
      return ranges.some((range) => {
        switch (range) {
          case '€0 - €10':
            return productPrice >= 0 && productPrice <= 10;
          case '€10 - €20':
            return productPrice > 10 && productPrice <= 20;
          case '€20 - €50':
            return productPrice > 20 && productPrice <= 50;
          case '€50 - €100':
            return productPrice > 50 && productPrice <= 100;
          case '€100+':
            return productPrice > 100;
          default:
            return true;
        }
      });
    });
  }, [productsByCategory, price]);

  /* ───────────────────────── SORT ───────────────────────── */
  const sortedProducts = useMemo(() => {
    if (!sortBy) return filteredProducts;

    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => parseFloat(a.metadata._price || '0') - parseFloat(b.metadata._price || '0'));
      case 'price_desc':
        return sorted.sort((a, b) => parseFloat(b.metadata._price || '0') - parseFloat(a.metadata._price || '0'));
      case 'recent':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  return {
    filteredProducts: sortedProducts,
    category,
    sortBy,
    search,
    price,
  };
};

export default useGymwearFilters;
