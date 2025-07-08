import { Input, XStack } from 'tamagui';
import { shadows } from '~/src/constant';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
export default function Search({
  placeholder,
  value,
  onChangeText,
  onPress,
}: {
  placeholder: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onPress?: () => void;
}) {
  return (
    <XStack
      f={1}
      alignItems="center"
      px={14}
      {...shadows.small}
      borderRadius={8}
      bg="white"
      gap="$2">
      <Input
        onPress={onPress}
        f={1}
        py={10}
        boxShadow="none"
        borderWidth={0}
        outlineWidth={0}
        bg="transparent"
        placeholder={placeholder}
        fontSize={14}
        placeholderTextColor="#8E95A2"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity>
        <Ionicons name="search-outline" size={20} color="#1E1F20" />
      </TouchableOpacity>
    </XStack>
  );
}

export function WorkOutSearch({
  placeholder,
  value,
  onChangeText,
  onPress,
}: {
  placeholder: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onPress?: () => void;
}) {
  return (
    <XStack
      f={1}
      alignItems="center"
      px={8}
      {...shadows.small}
      borderWidth={1}
      borderColor={'#E8EFFF'}
      borderRadius={8}
      bg="white"
      gap="$2">
      <Input
        onPress={onPress}
        f={1}
        py={10}
        boxShadow="none"
        borderWidth={0}
        outlineWidth={0}
        bg="transparent"
        placeholder={placeholder}
        fontSize={14}
        placeholderTextColor="#8E95A2"
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity>
        <Ionicons name="search-outline" size={20} color="#1E1F20" />
      </TouchableOpacity>
    </XStack>
  );
}
