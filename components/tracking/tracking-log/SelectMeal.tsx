import { TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import Scan from 'public/images/scan.svg';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import Search from '~/components/shared/Search';
import { shadows } from '~/constant';
import SelectedMeals from '../SelectedMeals';
import LoadingSpinner from '~/components/shared/Loading';
export default function SelectMeal({
  isKeyboardVisible,
  setOpen,
}: {
  isKeyboardVisible: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedAction, setSelectedAction] = useState<string | null>('All');
  const [search, setSearch] = useState<string>('');
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
      <SelectActionItem
        setOpen={setOpen}
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
      />

      <YStack
        p="$3"
        mb={isKeyboardVisible ? 100 : 0}
        gap="$3"
        bg="rgba(237, 238, 241, 0.20)"
        borderRadius={12}>
        <XStack f={1} w="100%">
          <Search value={search} onChangeText={setSearch} placeholder="Search your meal here" />
          {search && (
            <YStack
              bg="white"
              {...shadows.small}
              borderBottomEndRadius={isKeyboardVisible ? 0 : 12}
              borderBottomStartRadius={isKeyboardVisible ? 0 : 12}
              borderTopRightRadius={isKeyboardVisible ? 12 : 0}
              borderTopLeftRadius={isKeyboardVisible ? 12 : 0}
              position="absolute"
              right={0}
              left={0}
              top={isKeyboardVisible ? '-250%' : '92%'}
              zIndex={1}
              px={16}>
              {['Broccoli', 'Brussels sprouts', 'Chicken Breast'].map((item, i) => (
                <TouchableOpacity key={i}>
                  <XStack py={10} px={16}>
                    <Text>{item}</Text>
                  </XStack>
                </TouchableOpacity>
              ))}
            </YStack>
          )}
        </XStack>
        {selectedAction === 'All' && (
          <Suspense fallback={<LoadingSpinner color="#FD4F01" />}>
            <ScrollView maxHeight={400} nestedScrollEnabled={true}>
              <YStack>
                <FlashList
                  removeClippedSubviews={true}
                  // maxToRenderPerBatch={10}
                  // updateCellsBatchingPeriod={60}
                  data={[
                    {
                      name: 'Breakfast',
                      lists: [{ name: 'Breakfast' }],
                    },
                    {
                      name: 'Snack',
                      lists: [{ name: 'Snack' }],
                    },
                    {
                      name: 'Snack',
                      lists: [{ name: 'Snack' }],
                    },
                    {
                      name: 'Snack',
                      lists: [{ name: 'Snack' }],
                    },
                    {
                      name: 'Snack',
                      lists: [{ name: 'Snack' }],
                    },
                    {
                      name: 'Snack',
                      lists: [{ name: 'Snack' }],
                    },
                  ].slice(0, 10)}
                  nestedScrollEnabled={true}
                  estimatedItemSize={20}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <SelectedMeals action={() => {}} buttonType="add" />}
                />
              </YStack>
            </ScrollView>
          </Suspense>
        )}
      </YStack>
    </>
  );
}

const SelectActionItem = ({
  selectedAction,
  setSelectedAction,
  setOpen,
}: {
  selectedAction: string | null;
  setSelectedAction: Dispatch<SetStateAction<string | null>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handlePress = (name: string) => {
    if (name === 'Scan') {
      setOpen(true);
    }
    setSelectedAction(name);
  };
  return (
    <XStack gap="4" justifyContent="space-between">
      {actions.map(({ name, icon }, i) => (
        <Button
          onPress={() => handlePress(name)}
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
