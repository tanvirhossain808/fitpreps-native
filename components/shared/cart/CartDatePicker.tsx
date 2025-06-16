import { useState } from 'react';
import { View, YStack, XStack, Portal, Text } from 'tamagui';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import StepIndicator from '../StepIndicator';
import DatePicker from '~/components/shared/DatePicker';
import DatePickerCalendar from 'public/images/calendar.svg';
import { DateData } from 'react-native-calendars';

export default function CartDatePicker({ cartType = 'meals' }: { cartType?: string }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
  const formatSelectedDate = (date: DateData | null) => {
    if (!date) return 'Pick delivery date';
    const dateObj = new Date(date.dateString);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <>
      <YStack flex={1} gap="$3">
        <YStack gap={12} px="$4" py="$5">
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 184, 23, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              flex: 1,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 20,
              position: 'absolute',
              inset: 0,
            }}></LinearGradient>

          <Text fontSize={16} fontWeight={700} color="#1E1F20">
            {cartType === 'meals' ? 'Pick Delivery Date' : 'Pick subscription start date'}
          </Text>
          <Text color="#FD4F01" fontWeight={500} fontSize={12}>
            NOTE: We don’t deliver on Saturday and Sunday.
          </Text>
          <TouchableOpacity
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: '#E5F8EA',
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowColor: '#0A0D12',
            }}
            onPress={() => setShowDatePicker(!showDatePicker)}>
            <DatePickerCalendar size={20} />
            <Text alignSelf="stretch" flex={1} color="#8E95A2" fontSize={14}>
              {formatSelectedDate(selectedDate)}
            </Text>
            {showDatePicker ? (
              <Entypo name="chevron-small-up" size={20} color="#1E1F20" />
            ) : (
              <Entypo name="chevron-small-down" size={20} color="#1E1F20" />
            )}
          </TouchableOpacity>
        </YStack>
        {showDatePicker && (
          <Portal>
            <View
              zIndex={10000}
              position="absolute"
              top={270}
              px={36}
              left={0}
              right={0}
              bottom={0}>
              <DatePicker
                toggleDatePicker={toggleDatePicker}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </View>
          </Portal>
        )}
      </YStack>
    </>
  );
}
