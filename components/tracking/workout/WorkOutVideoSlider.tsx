import { Image, ScrollView, Text, XStack, YStack } from 'tamagui';
import StopWatch from 'public/images/clock-stopwatch.svg';
import Bookmark from 'public/images/bookmark.svg';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import Play from 'public/images/play.svg';
export default function WorkOutVideoSlider({ onPress }: { onPress: () => void }) {
  const handleBookmark = () => {
    Toast.show({
      type: 'success',
      text1: 'Bookmark Added',
    });
  };
  return (
    <YStack>
      <ScrollView mt="$5" space="$3" horizontal showsHorizontalScrollIndicator={false}>
        {workoutVideos.map((item, i) => (
          <YStack
            borderWidth={1}
            borderColor="#EDEEF1"
            width={280}
            key={i}
            borderRadius={12}
            overflow="hidden">
            <XStack w="100%" height={164}>
              <Image w="100%" h="100%" source={item.img} />
              <XStack gap="$2" position="absolute" top={6} left={6} right={0}>
                <Text p={8} bg="#FC0" borderRadius={20} fontSize={10} fontWeight={700}>
                  Beginner
                </Text>
                <Text
                  p={8}
                  bg="$tracking-primary"
                  color="white"
                  borderRadius={20}
                  fontSize={10}
                  fontWeight={700}>
                  Strength Training
                </Text>
              </XStack>

              <XStack
                position="absolute"
                top="50%"
                right="50%"
                transform={[{ translateX: '50%' }, { translateY: '-50%' }]}
                alignItems="center"
                justifyContent="center">
                <TouchableOpacity onPress={onPress}>
                  <Play />
                </TouchableOpacity>
              </XStack>
            </XStack>
            <YStack p="$3" gap="$1">
              <XStack alignItems="center" gap="$1" justifyContent="space-between">
                <XStack alignItems="center" gap="$1">
                  <StopWatch />
                  <Text fontSize={14} fontWeight={700} color="#FD4F01">
                    30 mins
                  </Text>
                </XStack>
                <TouchableOpacity onPress={handleBookmark}>
                  <Bookmark />
                </TouchableOpacity>
              </XStack>
              <Text fontSize={14} fontWeight={500}>
                20 Exercises
              </Text>
              <Text fontSize={12} mt={10}>
                Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </Text>
            </YStack>
          </YStack>
        ))}
      </ScrollView>
    </YStack>
  );
}

const workoutVideos = [
  {
    img: require('public/images/Fitpreps (32).png'),
  },
  {
    img: require('public/images/Fitpreps (32).png'),
  },
  {
    img: require('public/images/Fitpreps (32).png'),
  },
  {
    img: require('public/images/Fitpreps (32).png'),
  },
  {
    img: require('public/images/Fitpreps (32).png'),
  },
];
