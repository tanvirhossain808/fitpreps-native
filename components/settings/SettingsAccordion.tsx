import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Accordion, Checkbox, Text, View, XStack, YStack } from 'tamagui';
import { shadows } from '~/constant';

export default function SettingsAccordion() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const toggleValue = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  return (
    <YStack gap="$3">
      {radioSettings.map((data, index) => (
        <Accordion key={index} collapsible type="single" gap="$3">
          <Accordion.Item
            px="$4"
            py="$3"
            key={index}
            value={`item-${index}`}
            borderRadius={12}
            bg="#f6f6f8">
            <Accordion.Trigger p={0} bg="$backgroundTransparent" borderWidth={0}>
              {({ open }: { open: boolean }) => (
                <>
                  <XStack w="100%" justifyContent="space-between" gap={8} alignItems="flex-start">
                    <Text
                      flex={1}
                      flexShrink={1}
                      fontSize={16}
                      textWrap="wrap"
                      fontWeight="600"
                      color="#1E1F20">
                      {data.name}
                    </Text>
                    <XStack>
                      <Feather name={open ? 'chevron-up' : 'chevron-down'} size={24} />
                    </XStack>
                  </XStack>
                </>
              )}
            </Accordion.Trigger>
            <Accordion.Content exitStyle={{ opacity: 0 }} bg="" p={0} mt="$4">
              <YStack gap="$3">
                {data.options.map((option, index) => (
                  <TouchableOpacity
                    onPress={() => toggleValue(option.name)}
                    style={{ ...style.radioButton }}
                    key={index}>
                    <Checkbox
                      size="$1"
                      checked={selectedValues.includes(option.name)}
                      borderRadius={100}
                      width={14}
                      height={14}
                      borderWidth={1.5}
                      borderColor="#FD4F01"
                      backgroundColor="transparent">
                      <Checkbox.Indicator>
                        <View
                          width={9}
                          height={9}
                          borderRadius={100}
                          backgroundColor={
                            selectedValues.includes(option.name) ? '#FD4F01' : 'transparent'
                          }
                        />
                      </Checkbox.Indicator>
                    </Checkbox>
                    <Text fontSize={14} color="#1E1F20">
                      {' '}
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </YStack>
            </Accordion.Content>
            {/* </Accordion.HeightAnimator> */}
          </Accordion.Item>
        </Accordion>
      ))}
    </YStack>
  );
}

const style = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    ...shadows.small,
  },
});
const radioSettings = [
  {
    name: 'Fitness Goal',
    options: [
      { name: 'High-Protein' },
      { name: 'Keto' },
      { name: 'Vegan' },
      { name: 'Vegetarian' },
    ],
  },
  {
    name: 'Dietary Preference',
    options: [
      { name: 'High-Protein' },
      { name: 'Keto' },
      { name: 'Vegan' },
      { name: 'Vegetarian' },
    ],
  },
];
