import { Button, Text, View, XStack, YStack, Dialog } from 'tamagui';
import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FooterCart from './CartFooter';
import { extraFoods } from '~/src/constant';
import CartFoodList from './CartFoodList';
import SubsHeader from './Subscription/SubsHeader';
import SubsPlan from './Subscription/SubsPlan';
import CartCarousel from './CartCarosuel';
import Saving from './Saving';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { router } from 'expo-router';
import { Calendar, DateData } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  getNextDay, 
  generateHolidays, 
  formatDateForDisplay,
  getMarkedDates
} from '~/src/utils/datePickerUtils';

export default function CartStep1({
  setCurrentStep,
  cartType,
  orderData,
  date,
  setDate,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  cartType: string;
  orderData: any;
  date: DateData | null;
  setDate: React.Dispatch<React.SetStateAction<DateData | null>>;
}) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const cartItemsList = Object.values(cartItems) || [];
  
  // Date picker state
  const [showCalendar, setShowCalendar] = useState(false);
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [defaultDate, setDefaultDate] = useState<string>('');
  const shippingCountry = useSelector((s: RootState) => s.cart.shippingCountry);
  
  // Initialize holidays and default date
  useEffect(() => {
    const holidayDates = generateHolidays(shippingCountry || 'NL'); // Use cart state or default to Netherlands
    setHolidays(holidayDates);
    
    // Set default date to next available delivery day
    const nextDay = getNextDay();
    setDefaultDate(nextDay);
    
    // If no date is set, set the default
    if (!date) {
      setDate({ dateString: nextDay } as DateData);
    }
  }, [shippingCountry]);

  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          marginTop: index === 0 ? 20 : 0,
          marginBottom: index === extraFoods.length - 1 ? 20 : 0,
        }}>
        <CartFoodList item={item} />
      </View>
    );
  }, []);

  const markedDates = getMarkedDates(date?.dateString || null, holidays);

  return (
    <>
      {cartType === 'meals' && (
        <FlatList
          ListFooterComponent={
            <YStack>
              <Saving />
              {/* <CartCarousel /> */}
              <FooterCart date={date} setCurrentStep={setCurrentStep} orderData={orderData} />
            </YStack>
          }
          ListEmptyComponent={() => (
            <YStack gap="$5" ai="center" jc="center" f={1}>
              <Text fontSize={20} fontWeight="bold" color="#FD4F01">
                Cart is empty
              </Text>
              <Button
                bg="#FD4F01"
                fontSize={16}
                fontWeight="bold"
                color="white"
                onPress={() => router.back()}>
                Go back for more products
              </Button>
            </YStack>
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View h={12} />}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          style={{ ...style.flastListContainer }}
          ListHeaderComponent={
            <YStack>
              {/* Date Picker Section */}
              <YStack gap={12} px="$4" py="$5" mb="$4">
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
                  Selecteer bezorgdatum
                </Text>
                <Text color="#FD4F01" fontWeight={500} fontSize={12}>
                  OPMERKING: We bezorgen niet op zaterdag en zondag.
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
                  onPress={() => setShowCalendar(true)}>
                  <Text style={{ flex: 1, color: '#8E95A2', fontSize: 14 }}>
                    {date ? formatDateForDisplay(date.dateString) : 'Selecteer bezorgdatum'}
                  </Text>
                  <AntDesign name="calendar" size={20} color="#1E1F20" />
                </TouchableOpacity>
              </YStack>
            </YStack>
          }
          ListHeaderComponentStyle={{ marginBottom: 20 }}
          data={cartItemsList}
          renderItem={
            cartItemsList.length === 0
              ? () => (
                  <YStack f={1} jc="center" ai="center">
                    <Text>Cart is empty</Text>
                    <Button onPress={() => router.navigate('/(navigator)/(tabs)/meals')}>
                      Go to Products
                    </Button>
                  </YStack>
                )
              : renderItem
          }
          keyExtractor={(item, index) => item._id?.toString() || `item-${index}`}
        />
      )}

      {/* Calendar Modal */}
      <Dialog modal open={showCalendar} onOpenChange={setShowCalendar}>
        <Dialog.Portal>
          <Dialog.Overlay
            animation="quick"
            opacity={0.7}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ y: -30, opacity: 0, scale: 0.9 }}
            exitStyle={{ y: 20, opacity: 0, scale: 0.95 }}
            p="$5"
            borderRadius={24}
            backgroundColor="white">
            <YStack gap="$5">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={20} fontWeight="700" color="#111827">
                  📅 Selecteer bezorgdatum
                </Text>
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <View p="$3" borderRadius={20} backgroundColor="#F3F4F6">
                    <AntDesign name="close" size={20} color="#6B7280" />
                  </View>
                </TouchableOpacity>
              </XStack>

              <Calendar
                onDayPress={(day) => {
                  setDate({ dateString: day.dateString } as DateData);
                  setShowCalendar(false);
                }}
                markedDates={markedDates}
                minDate={defaultDate}
                theme={{
                  selectedDayBackgroundColor: '#FD4F01',
                  todayTextColor: '#FD4F01',
                  arrowColor: '#FD4F01',
                  monthTextColor: '#111827',
                  textDayFontWeight: '500',
                  textMonthFontWeight: '700',
                  textDayHeaderFontWeight: '600',
                  textSectionTitleColor: '#6B7280',
                  dayTextColor: '#374151',
                  selectedDayTextColor: 'white',
                  disabledDotColor: '#D1D5DB',
                }}
              />
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}

const style = StyleSheet.create({
  flastListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
