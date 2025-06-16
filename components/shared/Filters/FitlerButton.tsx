import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Portal, Text } from 'tamagui';
import FilterModal from '~/components/modal/Filter';
import { useState } from 'react';

export default function () {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const handleFilterPress = useCallback(() => {
    setFilterOpen(true);
  }, []);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}
        onPress={handleFilterPress}>
        <Ionicons name="filter-outline" size={16} color="#25272C" />
        <Text color="#25272C" fontSize={12}>
          Filters
        </Text>
      </TouchableOpacity>
      {filterOpen && (
        <Portal>
          <FilterModal
            open={filterOpen}
            setOpen={setFilterOpen}
            filters={filters}
            setFilters={setFilters}
          />
        </Portal>
      )}
    </>
  );
}
