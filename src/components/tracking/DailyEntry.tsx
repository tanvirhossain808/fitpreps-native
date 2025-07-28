import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import IntakeAmountPopUp from './workout/IntakeAmountPopUp';
export default function DailyEntry() {
  const [showIntakePopUp, setShowIntakePopUp] = useState(false);
  const [intakeType, setIntakeType] = useState('');
  const handleIntakePopUp = (type: string) => {
    setShowIntakePopUp(true);
    setIntakeType(type);
  };
  return (
    <>
      <YStack gap="$4">
        <Text fontSize={16} fontWeight={700}>
          Add your daily entry here.
        </Text>
        <XStack
          f={1}
          // shadowColor="rgba(0, 0, 0, 0.05)"
          // shadowRadius={2}
          // elevation={10}
          // shadowOffset={{ width: 0, height: 1 }}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.60)', 'rgba(232, 239, 255, 0.60)']}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.linearGradient}>
            <YStack gap="$3" w="100%">
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
                  <TouchableOpacity onPress={() => router.push('/add-food-cals')}>
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
          </LinearGradient>
        </XStack>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.60)', 'rgba(232, 239, 255, 0.60)']}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.linearGradient}>
          <YStack gap="$3">
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
                <TouchableOpacity onPress={() => router.push('/log-workout')}>
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
        </LinearGradient>

        <XStack
          gap="$4"
          mb={100}
          // gap="$3"
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.60)', 'rgba(232, 239, 255, 0.60)']}
            start={[1, 0]}
            end={[0, 1]}
            style={{ ...styles.linearGradient }}>
            <YStack fb={1} gap="$3">
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
                  <TouchableOpacity onPress={() => handleIntakePopUp('water')}>
                    <Feather name="plus" size={16} color="#FD4F01" />
                  </TouchableOpacity>
                </XStack>
              </XStack>
              <Separator />
              <XStack>
                <BlueSub SubTitle="Add intake" title="2.5 ltr" />
              </XStack>
            </YStack>
          </LinearGradient>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.60)', 'rgba(232, 239, 255, 0.60)']}
            start={[1, 0]}
            end={[0, 1]}
            style={{
              ...styles.linearGradient,
            }}>
            <YStack gap="$3">
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
                  <TouchableOpacity onPress={() => handleIntakePopUp('weight')}>
                    <Feather name="plus" size={16} color="#FD4F01" />
                  </TouchableOpacity>
                </XStack>
              </XStack>
              <Separator />
              <XStack>
                <GraySubTitle SubTitle="Add weight" title="00 ltr" />
              </XStack>
            </YStack>
          </LinearGradient>
        </XStack>
      </YStack>
      {showIntakePopUp && (
        <IntakeAmountPopUp
          type={intakeType}
          open={showIntakePopUp}
          onOpenChange={setShowIntakePopUp}
        />
      )}
    </>
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

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 8,
    // width: '100%',
    flex: 1,
    padding: 12,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});
