import { TouchableOpacity } from 'react-native';
import { Button, Text, XStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import Scan from 'public/images/scan.svg';
import { useState } from 'react';
export default function SelectMealsTitle() {
  return (
    <>
      <XStack justifyContent="center" gap={10} alignItems="center">
        <Text fontSize={16} fontWeight={700}>
          Select a meal:
        </Text>
        <TouchableOpacity>
          <XStack gap="$1" alignItems="center">
            <Text
              fontSize={16}
              borderBottomWidth={2}
              borderBottomColor="#FD4F01"
              fontWeight={700}
              color="#FD4F01">
              Launch
            </Text>
            <Ionicons name="chevron-down-outline" size={16} color="#FD4F01" />
          </XStack>
        </TouchableOpacity>
      </XStack>
      <SelectItems />
    </>
  );
}

const SelectItems = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  return (
    <XStack gap="4" justifyContent="space-between">
      {actions.map(({ name, icon }, i) => (
        <Button
          onPress={() => setSelectedAction(name)}
          borderWidth={1}
          borderColor={selectedAction === name ? '$tracking-primary' : '#B6BAC3'}
          space={4}
          bg={selectedAction === name ? '#E8EFFF' : 'white'}
          fontSize={14}
          fontWeight={500}
          alignSelf="stretch"
          px={10}
          py={8}
          minWidth={0}
          key={i}
          icon={icon ? icon : null}>
          {name}
        </Button>
      ))}
    </XStack>
  );
};

const actions = [
  {
    name: 'Scan',
    icon: <Scan />,
  },
  {
    name: 'All',
    icon: '',
  },
  {
    name: 'Add Item',
    icon: <AntDesign name="plus" size={16} color="#383A42" />,
  },
  {
    name: 'Saved',
    icon: <FontAwesome6 name="bookmark" size={16} color="#383A42" />,
  },
];
