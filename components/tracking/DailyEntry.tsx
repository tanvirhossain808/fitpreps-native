import { TouchableOpacity } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
export default function DailyEntry() {
  return (
    <YStack gap="$4">
      <Text fontSize={16} fontWeight={700}>
        Add your daily entry here.
      </Text>
      <YStack
        gap="$3"
        p="$3"
        shadowColor="rgba(0, 0, 0, 0.05)"
        shadowRadius={2}
        shadowOffset={{ width: 0, height: 1 }}
        elevation={1}
        borderRadius={8}
        bg="#f7faff">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={16} fontWeight={500}>
            Food Calories
          </Text>
          <XStack
            w={28}
            borderRadius={14}
            h={28}
            bg="#FFEDE5"
            alignItems="center"
            justifyContent="center">
            <TouchableOpacity>
              <Feather name="plus" size={16} color="#FD4F01" />
            </TouchableOpacity>
          </XStack>
        </XStack>
        <Separator />
        <XStack gap="$1" alignItems="center" justifyContent="space-between">
          <BlueSub SubTitle="Breakfast" title="200 kCal" />
          <GraySubTitle SubTitle="Lunch" title="000 kCal" />
          <GraySubTitle SubTitle="Dinner" title="000 kCal" />
          <BlueSub SubTitle="Snacks" title="270 kCal" />
        </XStack>
      </YStack>
      <YStack
        gap="$3"
        p="$3"
        shadowColor="rgba(0, 0, 0, 0.05)"
        shadowRadius={2}
        shadowOffset={{ width: 0, height: 1 }}
        elevation={1}
        borderRadius={8}
        bg="#f7faff">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={16} fontWeight={500}>
            Workout
          </Text>
          <XStack
            w={28}
            borderRadius={14}
            h={28}
            bg="#FFEDE5"
            alignItems="center"
            justifyContent="center">
            <TouchableOpacity>
              <Feather name="plus" size={16} color="#FD4F01" />
            </TouchableOpacity>
          </XStack>
        </XStack>
        <Separator />
        <XStack gap="$4" alignItems="center" justifyContent="space-between">
          <BlueSub f={1} SubTitle="Calories Burnt" title="400 kCal" />
          <GraySubTitle f={1} SubTitle="Time Spent" title="00 : 00 : 00" />
        </XStack>
      </YStack>
      <XStack
        gap="$4"
        mb={100}
        // gap="$3"
      >
        <YStack
          p="$3"
          fb={1}
          gap="$3"
          shadowColor="rgba(0, 0, 0, 0.05)"
          shadowRadius={2}
          shadowOffset={{ width: 0, height: 1 }}
          elevation={1}
          borderRadius={8}
          bg="#f7faff"
          f={1}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={16} fontWeight={500}>
              Water
            </Text>
            <XStack
              w={28}
              borderRadius={14}
              h={28}
              bg="#FFEDE5"
              alignItems="center"
              justifyContent="center">
              <TouchableOpacity>
                <Feather name="plus" size={16} color="#FD4F01" />
              </TouchableOpacity>
            </XStack>
          </XStack>
          <Separator />
          <XStack>
            <BlueSub SubTitle="Add intake" title="2.5 ltr" />
          </XStack>
        </YStack>
        <YStack
          p="$3"
          gap="$3"
          shadowColor="rgba(0, 0, 0, 0.05)"
          shadowRadius={2}
          shadowOffset={{ width: 0, height: 1 }}
          elevation={1}
          borderRadius={8}
          bg="#f7faff"
          f={1}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={16} fontWeight={500}>
              Weight
            </Text>
            <XStack
              w={28}
              borderRadius={14}
              h={28}
              bg="#FFEDE5"
              alignItems="center"
              justifyContent="center">
              <TouchableOpacity>
                <Feather name="plus" size={16} color="#FD4F01" />
              </TouchableOpacity>
            </XStack>
          </XStack>
          <Separator />
          <XStack>
            <GraySubTitle SubTitle="Add weight" title="00 ltr" />
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}

const Separator = () => {
  return <XStack h={1} bg="#C4D6FC"></XStack>;
};
const BlueSub = ({
  SubTitle,
  title,
  ...rest
}: {
  SubTitle: string;
  title: string;
  [key: string]: any;
}) => {
  return (
    <YStack gap={4} {...rest}>
      <Text fontSize={12} fontWeight={500}>
        {SubTitle}
      </Text>
      <Text fontSize={16} fontWeight={700} color="#588DF5">
        {title}
      </Text>
    </YStack>
  );
};
const GraySubTitle = ({
  SubTitle,
  title,
  ...rest
}: {
  SubTitle: string;
  title: string;
  [key: string]: any;
}) => {
  return (
    <YStack gap={4} {...rest}>
      <Text fontSize={12} fontWeight={500}>
        {SubTitle}
      </Text>
      <Text fontSize={16} color="#B6BAC3">
        {title}
      </Text>
    </YStack>
  );
};
