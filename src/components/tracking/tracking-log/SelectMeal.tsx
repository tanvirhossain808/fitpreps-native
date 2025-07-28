import { Keyboard, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import Scan from 'public/images/scan.svg';
import { Dispatch, SetStateAction, Suspense, useState } from 'react';
import Search from '~/src/components/shared/Search';
import { shadows } from '~/src/constant';
import SelectedMeals from '../SelectedMeals';
import LoadingSpinner from '~/src/components/shared/Loading';
export default function SelectMeal({
  isKeyboardVisible,
  showFoodCalToast,
  setOpen,
}: {
  isKeyboardVisible: boolean;
  showFoodCalToast: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedAction, setSelectedAction] = useState<string | null>('All');
  const [search, setSearch] = useState<string>('');
  const [isPress, setIsPress] = useState<Record<number, boolean>>({});
  const [showProductSelect, setShowProductSelect] = useState(false);
  const [pressSearchBar, setPressSearchBar] = useState(false);
  const habdleAdd = () => {
    setSelectedAction('Saved');
    showFoodCalToast();
    Keyboard.dismiss();
    setShowProductSelect(false);
    setSearch('');
    setPressSearchBar(false);
  };
  const handleProductSelect = () => {
    Keyboard.dismiss();
    setShowProductSelect(true);
    setPressSearchBar(false);
  };
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
        mb={isKeyboardVisible ? 20 : 100}
        gap={selectedAction === 'All' ? '$3' : '$5'}
        bg="rgba(237, 238, 241, 0.20)"
        borderRadius={12}>
        <XStack f={1} w="100%">
          <Search
            value={search}
            onChangeText={setSearch}
            placeholder="Search your meal here"
            onPress={() => setPressSearchBar(true)}
          />
          {pressSearchBar && search && (
            <YStack
              bg="white"
              overflow="hidden"
              {...shadows.small}
              borderBottomEndRadius={isKeyboardVisible ? 12 : 12}
              borderBottomStartRadius={isKeyboardVisible ? 12 : 12}
              borderTopRightRadius={isKeyboardVisible ? 12 : 0}
              borderTopLeftRadius={isKeyboardVisible ? 12 : 0}
              position="absolute"
              right={0}
              left={0}
              top={isKeyboardVisible ? '-250%' : '92%'}
              zIndex={1000}>
              {['Broccoli', 'Brussels sprouts', 'Chicken Breast'].map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleProductSelect()}
                    activeOpacity={1}
                    onPressIn={() => setIsPress({ ...isPress, [i]: true })}
                    onPressOut={() => setIsPress({ ...isPress, [i]: false })}>
                    <XStack py={10} bg={isPress[i] ? '#E8EFFF' : 'white'} px={16}>
                      <Text>{item}</Text>
                    </XStack>
                  </TouchableOpacity>
                );
              })}
            </YStack>
          )}
        </XStack>

        {selectedAction === 'Add Item' && showProductSelect && (
          <YStack gap="$5">
            <YStack gap="">
              <Text fontSize={12}>Food Item</Text>
              <Text fontSize={14} fontWeight={700}>
                Chicken Breast
              </Text>
              <XStack gap="$2" mt={12} alignItems="center" justifyContent="space-between">
                <YStack gap={6} f={1}>
                  <Text fontSize={12} fontWeight={500}>
                    Serving Size
                  </Text>
                  <XStack
                    {...shadows.small}
                    bg="white"
                    borderWidth={1}
                    borderRadius={8}
                    borderColor="#EDEEF1"
                    p={10}>
                    <Text fontSize={14} color="#588DF5">
                      250 g
                    </Text>
                  </XStack>
                </YStack>
                <YStack gap={6} f={1}>
                  <Text fontSize={12} fontWeight={500}>
                    Calories
                  </Text>
                  <XStack
                    {...shadows.small}
                    bg="white"
                    borderWidth={1}
                    borderRadius={8}
                    borderColor="#EDEEF1"
                    p={10}>
                    <Text fontSize={14} color="#383A42">
                      250 g
                    </Text>
                  </XStack>
                </YStack>
                <YStack gap={6} f={1}>
                  <Text fontSize={12} fontWeight={500}>
                    Protein
                  </Text>
                  <XStack
                    {...shadows.small}
                    bg="white"
                    borderWidth={1}
                    borderRadius={8}
                    borderColor="#EDEEF1"
                    p={10}>
                    <Text fontSize={14} color="#383A42">
                      250 g
                    </Text>
                  </XStack>
                </YStack>
                <YStack gap={6} f={1}>
                  <Text fontSize={12} fontWeight={500}>
                    Carbs
                  </Text>
                  <XStack
                    {...shadows.small}
                    bg="white"
                    borderWidth={1}
                    borderRadius={8}
                    borderColor="#EDEEF1"
                    p={10}>
                    <Text fontSize={14} color="#383A42">
                      250 g
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
            </YStack>
            <XStack gap={10}>
              <Button
                w="48%"
                //  onPress={() => router.back()}
                // onPress={handleSubmit}
                backgroundColor="white"
                {...shadows.small}
                borderRadius={8}
                fontSize={16}
                fontWeight={700}
                borderWidth={1}
                borderColor="#FD4F01"
                color="#FD4F01"
                pressStyle={{
                  elevation: 2,
                  shadowColor: '#FF7435',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  backgroundColor: '#FD4F01', // Prevent dark flash
                }}>
                Save
              </Button>
              <Button
                onPress={() => habdleAdd()}
                w="48%"
                // onPress={handleSubmit}
                backgroundColor="#FD4F01"
                // elevation={2}
                // shadowColor="#FF7435"
                // shadowOffset={{ width: 0, height: 0 }}
                // shadowOpacity={1}
                // shadowRadius={2}
                borderRadius={8}
                fontSize={16}
                fontWeight={700}
                borderWidth={1}
                borderColor="#FD4F01"
                color="white"
                pressStyle={{
                  elevation: 2,
                  shadowColor: '#FF7435',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 2,
                  backgroundColor: '#FD4F01', // Prevent dark flash
                }}>
                Add
              </Button>
            </XStack>
          </YStack>
        )}
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
