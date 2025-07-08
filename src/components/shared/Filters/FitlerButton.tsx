import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Portal, Text } from 'tamagui';
import FilterModal from '~/src/components/modal/Filter';
import { filterItems } from '~/src/helper';

export default function ({ productType }: { productType: string }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const handleFilterPress = useCallback(() => {
    setFilterOpen(true);
  }, []);
  const totalFilters = Object.values(filters).reduce(
    (total, category) => total + category.length,
    0
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
