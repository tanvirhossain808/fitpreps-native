import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSortBy, setGender, resetFilters } from '../store/slices/filterSlice';
import { RootState } from '../store';
import { Productsmakelijke, SortOption } from '../types/type';
import { sliderData } from '../constant';

const useProductFilters = (initialProducts: Productsmakelijke[] = []) => {
  const dispatch = useDispatch();
  const {
    category,
    sortBy,
    filters: extraFilters,
  } = useSelector((state: RootState) => state.filter);

  /* ───────────────────────── CATEGORY ───────────────────────── */

  const productsByCategory = useMemo(() => {
    if (category?.toLowerCase() === 'alle') return initialProducts;
    return initialProducts.filter(
      (p) => p.categories[1]?.toLowerCase() === category?.toLowerCase()
    );
  }, [initialProducts, category]); // ← added initialProducts

  /* ───────────────────────── PRICE FILTER ───────────────────── */

  const filteredProducts = useMemo(() => {
    if (!productsByCategory.length) return [];

    if (!extraFilters?.price?.length) return productsByCategory;

    const ranges = extraFilters.price;

    return productsByCategory.filter((product) => {
      const prices = product.metadata?.weight_options?.map((o) => +o.price) ?? [];

      return ranges.some((range) => {
        switch (range) {
          case '€0 - €10':
            return prices.some((p) => p >= 0 && p <= 10);
          case '€10 - €20':
            return prices.some((p) => p > 10 && p <= 20);
          case '€20 - €50':
            return prices.some((p) => p > 20 && p <= 50);
          case '€50 - €100':
            return prices.some((p) => p > 50 && p <= 100);
          case '€100+':
            return prices.some((p) => p > 100);
          default:
            return false;
        }
      });
    });
  }, [productsByCategory, extraFilters.price]);

  /* ───────────────────────── SORTING ────────────────────────── */

  const sortProducts = useCallback(
    (products: Productsmakelijke[]): Productsmakelijke[] => {
      if (!products.length) return [];
      if (!sortBy) return products;
      const out = [...products];
      switch (sortBy) {
        case 'price_asc':
          out.sort(
            (a, b) =>
              Math.min(...(a.metadata?.weight_options?.map((o) => +o.price) ?? [0])) -
              Math.min(...(b.metadata?.weight_options?.map((o) => +o.price) ?? [0]))
          );
          break;
        case 'price_desc':
          out.sort(
            (a, b) =>
              +(b.metadata?.weight_options?.[0]?.price ?? 0) -
              +(a.metadata?.weight_options?.[0]?.price ?? 0)
          );
          break;
        case 'recent':
          out.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'oldest':
          out.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
      }
      return out;
    },
    [sortBy]
  );

  /* ────────────────── SORT + SLIDER INJECTION ───────────────── */

  const finalProducts = useMemo(() => {
    const sorted = sortProducts(filteredProducts);

    /* Inject slider + dummies */
    if (sorted.length >= 4)
      return [
        ...sorted.slice(0, 4),
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
        ...sorted.slice(4),
      ];

    if (sorted.length === 3)
      return [
        ...sorted,
        { id: 'dummy1', type: 'dummy1' },
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
      ];

    if (sorted.length === 2)
      return [...sorted, { ...sliderData }, ...sorted.slice(2), { id: 'dummy', type: 'dummy' }];

    if (sorted.length === 1)
      return [
        sorted[0],
        { id: 'dummy1', type: 'dummy1' },
        { ...sliderData },
        { id: 'dummy', type: 'dummy' },
      ];

    return [{ ...sliderData }, { id: 'dummy', type: 'dummy' }];
  }, [filteredProducts, sortProducts]); // ← depend on the fn + data

  /* ───────────────────────── ACTIONS ────────────────────────── */

  const updateCategory = useCallback((c: string) => dispatch(setCategory(c)), [dispatch]);
  const updateSortBy = useCallback((s: SortOption) => dispatch(setSortBy(s)), [dispatch]);
  const updateGender = useCallback(
    (g: 'male' | 'female' | null) => dispatch(setGender(g)),
    [dispatch]
  );
  const resetAllFilters = useCallback(() => dispatch(resetFilters()), [dispatch]);

  /* ───────────────────────── RETURN ─────────────────────────── */

  return {
    filters: { category, sortBy, filters: extraFilters },
    filteredProducts: finalProducts,
    updateCategory,
    updateSortBy,
    updateGender,
    resetAllFilters,
  };
};

export default useProductFilters;
