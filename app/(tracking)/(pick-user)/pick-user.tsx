import { router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';

export default function PickUser() {
  const [press, setPress] = useState<string | null>(null);
  const handleNextSteps = () => {
    if (press) {
      router.push('/log');
    }
    return;
  };
  return (
    <YStack f={1} bg="$background">
      <SafeAreaView>
        <DrawerPageHeader title="Curate Training Plan" />
      </SafeAreaView>
      <ScrollView f={1}>
        <YStack gap="$7" px="$4" py="$5">
          <Text fontSize={16} fontWeight={500}>
            Whom would you like to curate workouts for?
          </Text>
          {usersDetails.map((data, i) => (
            <TouchableOpacity
              onPress={handleNextSteps}
              onPressOut={() => setPress(null)}
              key={i}
              activeOpacity={0.9}
              onPressIn={() => setPress(data.name)}>
              <XStack
                borderWidth={press === data.name ? 2 : 1}
                borderColor={press === data.name ? '#588DF5' : '#EDEEF1'}
                borderRadius={8}
                px="$3"
                py={10}>
                <Text fontSize={16} fontWeight={500}>
                  {data.name}
                </Text>
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const usersDetails = [
  {
    name: 'User 1',
  },
  {
    name: 'User 2',
  },
  {
    name: 'User 3',
  },
];
