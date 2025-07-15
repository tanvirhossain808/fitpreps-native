import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sheet, YStack, XStack, Text, Button, Checkbox, H4, Accordion, ScrollView } from 'tamagui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { cookdFilter } from '~/src/constant';
import Entypo from '@expo/vector-icons/Entypo';
import { FilterOption } from '~/src/types/type';
import { useDispatch } from 'react-redux';
import { resetFilters, setFilter } from '~/src/store/slices/filterSlice';

type FilterModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  filters: { [key: string]: string[] };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  filterOption: FilterOption[];
  totalFilters: number;
};

export default function FilterModal({
  open,
  setOpen,
  filters,
  setFilters,
  totalFilters,
  filterOption,
}: FilterModalProps) {
  const dispatch = useDispatch();

  // const [selectedKeys, setSelectedKeys] = useState<{ [key: string]: string[] }>({});
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setFilters({});
    setOpen(false);
  };
  const addField = () => {
    const initialKeys: { [key: string]: string[] } = {};
    filterOption.forEach((data) => {
      initialKeys[data.name] = [];
    });
    setFilters(initialKeys);
  };

  // useEffect(() => {
  //   addField();
  // }, [cookdFilter]);
  const applyFilters = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setFilter(filters));
    }, 0);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen} snapPoints={[100]} dismissOnSnapToBottom>
      <SafeAreaView style={{ flex: 1 }}>
        <Sheet.Overlay />
        <Sheet.Frame p="$4" px="$4" py="$7" bg="white" flex={1} borderRadius={0}>
          <YStack flex={1}>
            <ScrollView style={{ flex: 1 }}>
              <YStack gap={28}>
                <XStack justifyContent="space-between" alignItems="center">
                  <H4 color="#1E1F20" size={16} fontWeight={700}>
                    Filters ({totalFilters})
                  </H4>
                  <TouchableOpacity onPress={() => setOpen(false)}>
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </XStack>

                <Accordion
                  overflow="hidden"
                  width="100%"
                  type="multiple"
                  defaultValue={filterOption.map((f) => f.name)}>
                  {filterOption.map((data, i) => (
                    <Accordion.Item value={data.name} key={i}>
                      <Accordion.Trigger
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        py="$3"
                        bg="transparent"
                        borderColor="transparent"
                        borderRadius={8}
                        p={0}>
                        {({ open }: { open: boolean }) => (
                          <>
                            <Text fontWeight="500" color="#242424">
                              {data.name}
                            </Text>
                            <Entypo
                              name={open ? 'chevron-thin-up' : 'chevron-thin-down'}
                              size={16}
                              color="black"
                            />
                          </>
                        )}
                      </Accordion.Trigger>

                      <Accordion.Content bg="white" px={0}>
                        <XStack flexWrap="wrap" gap="$3">
                          {data.filterOption.map((option, i) => (
                            <Button
                              borderRadius={8}
                              key={i}
                              bg={
                                filters[data.name]?.includes(option)
                                  ? data.bg
                                  : '$backgroundTransparent'
                              }
                              borderColor={
                                filters[data.name]?.includes(option) ? data.border : '#B6BAC3'
                              }
                              minWidth={0}
                              px={12}
                              py={8}
                              onPress={() =>
                                setFilters((prev) => {
                                  const alreadySelected = prev[data.name]?.includes(option);
                                  return {
                                    ...prev,
                                    [data.name]: alreadySelected
                                      ? prev[data.name].filter((v) => v !== option)
                                      : [...(prev[data.name] || []), option],
                                  };
                                })
                              }>
                              <Text color="#1E1F20" fontSize={14} fontWeight={500}>
                                {option}
                              </Text>
                            </Button>
                          ))}
                        </XStack>
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </YStack>
            </ScrollView>
            <XStack gap="$3" width="100%">
              <XStack gap="$3" width="100%" mt="$4">
                <Button
                  flex={1}
                  alignSelf="stretch"
                  borderColor="#FD4F01"
                  borderRadius={8}
                  px="$5"
                  bg={'white'}
                  color="#FD4F01"
                  fontWeight={700}
                  onPress={() => handleResetFilters()}>
                  Reset Filters
                </Button>
                <Button
                  onPress={applyFilters}
                  flex={1}
                  alignSelf="stretch"
                  borderColor="#FD4F01"
                  borderRadius={8}
                  px="$5"
                  color={'white'}
                  bg="#FD4F01"
                  fontWeight={700}>
                  Apply Filters
                </Button>
              </XStack>
            </XStack>
          </YStack>
        </Sheet.Frame>
      </SafeAreaView>
    </Sheet>
  );
}
