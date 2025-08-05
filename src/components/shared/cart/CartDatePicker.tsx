import { useEffect, useState } from 'react';
import { View, YStack, XStack, Portal, Text } from 'tamagui';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';
import StepIndicator from '../StepIndicator';
import DatePicker from '~/src/components/shared/DatePicker';
import DatePickerCalendar from 'public/images/calendar.svg';
import { DateData } from 'react-native-calendars';
import { 
  getNextDay, 
  generateHolidays, 
  formatDateForDisplay,
  getMarkedDates,
  isHoliday
} from '~/src/utils/datePickerUtils';

export default function CartDatePicker({
  cartType = 'meals',
  handleDateSelect,
  date,
  isDisabled = false,
  shippingCountry = 'NL',
}: {
  cartType?: string;
  handleDateSelect?: (date: any) => any;
  date?: DateData | null;
  isDisabled?: boolean;
  shippingCountry?: string;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [defaultDate, setDefaultDate] = useState<string>('');

  // Initialize holidays and default date
  useEffect(() => {
    const holidayDates = generateHolidays(shippingCountry);
    setHolidays(holidayDates);
    
    // Set default date to next available delivery day
    const nextDay = getNextDay();
    setDefaultDate(nextDay);
    
    // If no date is selected, set the default
    if (!selectedDate && !date) {
      const defaultDateData = { dateString: nextDay } as DateData;
      setSelectedDate(defaultDateData);
      if (handleDateSelect) {
        handleDateSelect(defaultDateData);
      }
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (!selectedDate) return;
    if (handleDateSelect) {
      handleDateSelect(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (date) {
      setSelectedDate({ dateString: date.dateString || date } as any);
    }
  }, [date]);

  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  const formatSelectedDate = (date: DateData | null) => {
    if (typeof date === 'string') {
      return formatDateForDisplay(date);
    }
    if (!date) return 'Selecteer bezorgdatum';
    return formatDateForDisplay(date.dateString);
  };

  const handleDateChange = (day: any) => {
    const selectedDateData = { dateString: day.dateString } as DateData;
    setSelectedDate(selectedDateData);
    setShowDatePicker(false);
    
    if (handleDateSelect) {
      handleDateSelect(selectedDateData);
    }
  };

  const markedDates = getMarkedDates(
    selectedDate?.dateString || null, 
    holidays
  );

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
            {cartType === 'meals' ? 'Selecteer bezorgdatum' : 'Selecteer abonnement startdatum'}
          </Text>
          <Text color="#FD4F01" fontWeight={500} fontSize={12}>
            OPMERKING: We bezorgen niet op zaterdag en zondag.
          </Text>
          <TouchableOpacity
            disabled={isDisabled}
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
              {date ? formatDateForDisplay(typeof date === 'string' ? date : date.dateString) : formatSelectedDate(selectedDate)}
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
                date={selectedDate || { dateString: defaultDate } as DateData}
                setDate={handleDateChange}
              />
            </View>
          </Portal>
        )}
      </YStack>
    </>
  );
}
