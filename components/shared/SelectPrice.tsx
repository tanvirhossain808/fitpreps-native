import { Adapt, Select, Sheet, Text, XStack } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SelectPrice({ values }: { values: { quantity: string; price: string }[] }) {
  return (
    <Select defaultValue={values[0].quantity}>
      <Select.Trigger
        iconAfter={<AntDesign name="down" size={16} color="#A1A1A1" />}
        width={'100%'}
        borderWidth={1}
        borderColor="#A1A1A1"
        borderRadius={4}
        p={8}
        backgroundColor="$backgroundTransparent">
        <Select.Value />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            <Select.Label>Options</Select.Label>
            {values.map((value, index) => (
              <Select.Item key={index} index={index} value={value.quantity}>
                <Select.ItemText>
                  <XStack>
                    <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                      {value.quantity} - <Text color="#FD4F01">€{value.price}</Text>
                    </Text>
                  </XStack>
                </Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <AntDesign name="check" size={24} color="black" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
