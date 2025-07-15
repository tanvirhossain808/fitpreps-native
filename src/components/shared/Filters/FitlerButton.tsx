import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Portal, Text } from 'tamagui';
import FilterModal from '~/src/components/modal/Filter';
import { filterItems } from '~/src/helper';
import { RootState } from '~/src/store';
import { resetAllFilters } from '~/src/store/slices/filterSlice';
import { SortOption } from '~/src/types/type';

export default function ({
  productType,
  updateSortBy,
}: {
  productType: string;
  updateSortBy: (sortOption: SortOption) => void;
}) {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const filterPrices = useSelector((s: RootState) => s.filter.filters);
  const handleFilterPress = useCallback(() => {
    setFilterOpen(true);
  }, []);
  const totalFilters = Object.values(filters).reduce(
    (total, category) => total + category.length,
    0
  );
  useEffect(() => {
    if (Object.keys(filterPrices).length === 0) {
      setFilters({});
    }
  }, [filterPrices]);
  useFocusEffect(
    useCallback(() => {
      setFilters({});
      dispatch(resetAllFilters());
    }, [])
  );
  const filterOption = filterItems(productType);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
        onPress={handleFilterPress}>
        <Ionicons name="filter-outline" size={16} color="#25272C" />
        <Text color="#25272C" fontSize={12}>
          Filters{' '}
          {totalFilters > 0 ? (
            <Text fontSize={12} color="#FD4F01">
              ({totalFilters})
            </Text>
          ) : (
            ''
          )}
        </Text>
      </TouchableOpacity>
      {filterOpen && (
        <Portal>
          <FilterModal
            filterOption={filterOption}
            open={filterOpen}
            setOpen={setFilterOpen}
            filters={filters}
            setFilters={setFilters}
            totalFilters={totalFilters}
          />
        </Portal>
      )}
    </>
  );
}
