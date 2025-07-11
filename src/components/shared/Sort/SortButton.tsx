import { View, Text, Portal } from 'tamagui';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { foodSortByOptions } from '~/src/constant';
import Sortby from '~/src/components/shared/Sortby';
import { SortOption } from '~/src/types/type';

export default function SortButton({
  updateSortBy,
}: {
  updateSortBy: (sortOption: SortOption) => void;
}) {
  const [sort, setSort] = useState<null | string>(null);
  const [showSort, setShowSort] = useState(false);
  const handleOutsidePress = useCallback(() => {
    setShowSort(false);
  }, []);
  const handleSortPress = useCallback(() => {
    setShowSort((prev) => !prev);
  }, []);
  const handleUpdateSortBy = (sortOption: SortOption) => {
    updateSortBy(sortOption);
  };

  return (
    <TouchableOpacity
      onPress={handleSortPress}
      activeOpacity={0.5}
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text color="#25272C" fontSize={12}>
        {sort || 'Sort By'}
      </Text>
      <Ionicons name={showSort ? 'chevron-up' : 'chevron-down'} size={16} color="#25272C" />
      {showSort && (
        <Portal>
          <View style={styles.sortDropdownContainer} position="absolute" zIndex={299}>
            <TouchableOpacity
              style={styles.sortBackdrop}
              activeOpacity={1}
              onPress={handleOutsidePress}
            />
            <Sortby
              handleUpdateSortBy={updateSortBy}
              data={foodSortByOptions}
              setShowSort={setShowSort}
              sort={sort}
              setSort={setSort}
            />
          </View>
        </Portal>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  sortDropdownContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  sortBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
