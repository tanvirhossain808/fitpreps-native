import { Adapt, Select, Sheet, Text, View, XStack } from 'tamagui';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Productsmakelijke } from '~/src/types/type';
import Coin from '~/public/images/coin.svg';
export default function SelectPrice({
  values,
  setSelectProduct,
  quantity,
}: {
  values?: { weight: string; price: string; coin?: string }[];
  setSelectProduct: React.Dispatch<React.SetStateAction<Productsmakelijke | undefined>>;
  quantity: number;
}) {
  const handleSelectedValue = (value: string) => {
    const selectedOption = values?.find((v) => v.weight === value);
    if (selectedOption) {
      setSelectProduct((prev: any) => {
        return {
          ...prev,
          selectedWeight: selectedOption,
        };
      });
    }
  };
  return (
    <Select
      defaultValue={values?.[0]?.weight}
      onValueChange={(value) => {
        handleSelectedValue(value);
      }}>
      <Select.Trigger
        disabled={quantity < 0}
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
            {values?.map((value, index) => (
              <Select.Item key={index} index={index} value={value?.weight}>
                <Select.ItemText>
                  {!value?.coin ? (
                    <XStack alignItems="center">
                      <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                        {value?.weight} - <Text color="#FD4F01">€{value?.price}s</Text>
                      </Text>
                    </XStack>
                  ) : (
                    <XStack alignItems="center">
                      <Text color="#1E1F20" fontWeight={600} fontSize={12}>
                        {value?.weight} -{' '}
                      </Text>
                      <View>
                        <Coin />
                      </View>
                      <Text></Text>
                      <Text>{value?.coin}</Text>
                    </XStack>
                  )}
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
