import { useState } from 'react';
import { Switch, Text, XStack, YStack } from 'tamagui';

export default function NotificationSetting() {
  const [switchStates, setSwitchStates] = useState(SettingReminders.map(() => false));

  const toggleSwitch = (index: number) => {
    const updatedStates = [...switchStates];
    updatedStates[index] = !updatedStates[index];
    setSwitchStates(updatedStates);
  };

  return (
    <YStack gap="$7">
      {SettingReminders.map((item, index) => (
        <YStack key={index}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text flex={1} flexShrink={1} color="#1E1F20" fontSize={16} fontWeight="700">
              {item.name}
            </Text>
            <Switch
              size="$3"
              width={50}
              pr={5}
              pl={4}
              pt={1}
              height={22}
              alignItems="center"
              justifyContent="center"
              checked={switchStates[index]}
              onCheckedChange={() => toggleSwitch(index)}
              backgroundColor={switchStates[index] ? '#FD4F01' : '#B6BAC3'}
              pressStyle={{ opacity: 0.8 }}>
              <Switch.Thumb
                animation="quick"
                backgroundColor="white"
                width={16}
                height={16}
                margin={2}
              />
            </Switch>
          </XStack>
          <Text fontSize={14} color="#1E1F20" mt={1} maxWidth={'85%'}>
            {item.description}
          </Text>
        </YStack>
      ))}
    </YStack>
  );
}

const SettingReminders = [
  {
    name: 'Meal Reminders ',
    description: 'Get reminders when it’s time to stock up on meals. ',
  },
  {
    name: 'Workout Reminders',
    description: 'Stay on track with nudges to complete your daily workouts. ',
  },
  {
    name: 'Weekly Progress Summary',
    description: 'Get a weekly digest of your fitness, nutrition, and tracking stats.',
  },
  {
    name: 'Promotions & Offers',
    description: 'Be the first to know about new plans, offers, and seasonal menus..',
  },
];
