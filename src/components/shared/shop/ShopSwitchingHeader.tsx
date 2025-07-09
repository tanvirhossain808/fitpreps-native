import { Button, XStack } from 'tamagui';
import React, { Dispatch } from 'react';
import useProductFilters from '~/src/hooks/useProductFilters';

export default function SwitchHeader({
  product,
  selectCategory = '',
  setSelectCategory = () => {},
  setGender,
}: {
  product: string;
  selectCategory?: string;
  setSelectCategory?: Dispatch<React.SetStateAction<string>>;
  setGender: Dispatch<React.SetStateAction<'male' | 'female' | null>>;
}) {
  const bg = selectCategory === 'Supplements' ? '#FF7435' : '#BDB0F4';
  const handleOnPress = () => {
    setSelectCategory(() => 'Supplements');
    setGender(() => null);
  };
  const { updateCategory } = useProductFilters();
  return (
    <XStack width={'100%'} p={4} borderRadius={8} borderWidth={1} borderColor="#B6BAC3">
      <Button
        onPress={handleOnPress}
        width={'50%'}
        color={selectCategory === 'Supplements' ? 'white' : '#1E1F20'}
        fontWeight={selectCategory === 'Supplements' ? 700 : 500}
        shadowColor={selectCategory === 'Supplements' ? 'rgba(10, 13, 18, 0.05)' : 'transparent'}
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={selectCategory === 'Supplements' ? 2 : 0}
        shadowOpacity={selectCategory === 'Supplements' ? 1 : 0}
        elevation={selectCategory === 'Supplements' ? 0.05 : 0}
        bg={selectCategory === 'Supplements' ? bg : 'white'}>
        Supplements
      </Button>
      <Button
        onPress={() => setSelectCategory('Gym Wear')}
        width={'50%'}
        color={selectCategory === 'Gym Wear' ? 'white' : '#1E1F20'}
        fontWeight={selectCategory === 'Gym Wear' ? 700 : 500}
        shadowColor={selectCategory === 'Gym Wear' ? 'rgba(10, 13, 18, 0.05)' : 'transparent'}
        shadowOffset={{ width: 0, height: 1 }}
        shadowRadius={selectCategory === 'Gym Wear' ? 2 : 0}
        shadowOpacity={selectCategory === 'Gym Wear' ? 1 : 0}
        elevation={selectCategory === 'Gym Wear' ? 0.05 : 0}
        bg={selectCategory === 'Gym Wear' ? bg : 'white'}>
        Gym Wear
      </Button>
    </XStack>
  );
}
