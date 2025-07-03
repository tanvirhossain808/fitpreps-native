import React from 'react';
import { Text, XStack, YStack } from 'tamagui';
import SelectMealsPic from 'public/images/selectedMeals.svg';
import CloseIcon from 'public/images/x-close.svg';
import PlusIcon from 'public/images/plus.svg';
import { TouchableOpacity } from 'react-native';
export default function SelectedMeals({
  buttonType,
  action = () => {},
}: {
  buttonType: string;
  action?: () => void;
}) {
  return (
    <XStack
      py="$2"
      borderBottomWidth={1}
      borderBottomColor="#EDEEF1"
      gap="$2"
      w="100%"
      alignItems="center">
      <SelectMealsPic />
      <XStack alignItems="center" f={1} justifyContent="space-between">
        <YStack gap={1}>
          <Text fontSize={10} fontWeight={700}>
            STEW - MASHED POTATOES - CARROT MIX
          </Text>
          <Text fontWeight={500} fontSize={12}>
            333 kCal | 475 g
          </Text>
        </YStack>
        {buttonType === 'cancel' ? <CancelButton action={action} /> : <AddButton action={action} />}
      </XStack>
    </XStack>
  );
}

const CancelButton = ({ action = () => {} }: { action?: () => void }) => {
  return (
    <TouchableOpacity onPress={action}>
      <XStack
        w={28}
        h={28}
        justifyContent="center"
        alignItems="center"
        borderRadius={14}
        bg="white">
        <CloseIcon />
      </XStack>
    </TouchableOpacity>
  );
};
const AddButton = ({ action = () => {} }: { action?: () => void }) => {
  return (
    <TouchableOpacity onPress={action}>
      <XStack
        w={28}
        h={28}
        justifyContent="center"
        alignItems="center"
        borderRadius={14}
        bg="white">
        <PlusIcon />
      </XStack>
    </TouchableOpacity>
  );
};
