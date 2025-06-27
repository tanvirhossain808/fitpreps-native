import { Dispatch } from 'react';
import { Pressable } from 'react-native';
import { Popover, Text, View, YStack } from 'tamagui';

const PopoverContent = ({
  index,
  handleDelete,
  setPressedItem,
  handleEdit,
}: {
  index: number;
  handleDelete: (index: number) => void;
  setPressedItem: Dispatch<React.SetStateAction<string | null>>;
  handleEdit: (index: number) => void;
}) => (
  <Popover.Content
    position="absolute"
    overflow="hidden"
    borderWidth={1}
    borderColor="#B6BAC3"
    bg="white"
    p={0}
    borderRadius={8}
    enterStyle={{ y: -5, opacity: 0 }}
    exitStyle={{ y: -5, opacity: 0 }}
    shadowColor="rgba(0, 0, 0, 0.15)"
    shadowOffset={{ width: 0, height: 4 }}
    shadowRadius={8}
    shadowOpacity={1}
    elevation={2}
    padding={0}
    margin={0}
    minWidth={120}>
    <YStack width="100%">
      <Pressable
        onPress={() => handleEdit(index)}
        onPressIn={() => setPressedItem('edit')}
        onPressOut={() => setPressedItem(null)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#FFEDE5' : 'transparent',
          padding: 12,
          borderWidth: 0,
          alignItems: 'center',
        })}>
        <Text color="#1E1F20" fontSize={14} fontWeight={500}>
          Edit
        </Text>
      </Pressable>

      <View height={1} backgroundColor="#F0F0F0" width="100%" />

      <Pressable
        onPress={() => handleDelete(index)}
        onPressIn={() => setPressedItem('delete')}
        onPressOut={() => setPressedItem(null)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#FFEDE5' : 'transparent',
          padding: 12,
          borderWidth: 0,
          alignItems: 'center',
        })}>
        <Text color="#1E1F20" fontSize={14} fontWeight={500}>
          Remove
        </Text>
      </Pressable>
    </YStack>
  </Popover.Content>
);
export default PopoverContent;
