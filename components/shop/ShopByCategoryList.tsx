import { YStack } from 'tamagui';
import { shopProductSection } from '~/constant';
import ShopByProductSection from './ShopProductSection';
import { Dispatch } from 'react';

export default function ShopByCategoryList({
  setGender,
}: {
  setGender: Dispatch<React.SetStateAction<'male' | 'female' | null>>;
}) {
  return (
    <YStack flex={1}>
      <ShopByProductSection data={shopProductSection} setGender={setGender} />
    </YStack>
  );
}
