import {
  View,
  Text,
  Button,
  YStack,
  XStack,
  Dialog,
  AnimatePresence,
  ScrollView,
  Spinner,
  Input,
  RadioGroup,
  Label,
  Fieldset,
  Select,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { useCreateOrderMutation } from '~/src/store/apiSlices/createOrderSlice';
import { useCartLogic } from '~/src/hooks/useCartLogic';
import { Calendar, DateData } from 'react-native-calendars';
import { KeyboardTypeOptions } from 'react-native';
import { 
  getNextDay, 
  generateHolidays, 
  formatDateForDisplay,
  getMarkedDates,
  isHoliday,
  formatDateToYYYYMMDD
} from '~/src/utils/datePickerUtils';

// Define proper types for form data
interface FormData {
  billing_email: string;
  billing_first_name: string;
  billing_last_name: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_phone: string;
  billing_company: string;
  billing_company_kvk: string;
  billing_company_vat: string;
  shipping_email: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_country: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postcode: string;
  shipping_phone: string;
  shipping_company: string;
  shipping_company_kvk: string;
  shipping_company_vat: string;
  delivery_time: string;
  paymentMethod: string;
}

// Define proper types for form errors
interface FormErrors {
  [key: string]: string | undefined;
  billing_email?: string;
  billing_first_name?: string;
  billing_last_name?: string;
  billing_address_1?: string;
  billing_address_2?: string;
  billing_city?: string;
  billing_postcode?: string;
  billing_phone?: string;
  shipping_email?: string;
  shipping_first_name?: string;
  shipping_last_name?: string;
  shipping_address_1?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_postcode?: string;
  shipping_phone?: string;
  deliveryDate?: string;
}

export default function CartStep2({
  setCurrentStep,
  isEditAddress,
  date,
  setDate,
  orderData,
  setIsEditAddress,
  isShowMapModal,
  setShowMapModal,
  setIsAddressModalOpen,
  isAddressModalOpen,
  selectedIndex,
  setSelectedIndex,
  selectedSubPlan,
  setSelectedSubPlan,
  onFormDataChange,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isEditAddress: boolean;
  date: any;
  orderData: {
    subTotal: number;
    user_id: string;
    total: string;
    totalWeight: number;
    createdAt: number;
    updatedAt: number;
    metadata: {
      _cart_discount: number;
      _order_shipping: number;
      _order_shipping_tax: number;
      _order_tax: number;
      _order_total: number;
    };
    items: any;
  };
  setDate: React.Dispatch<React.SetStateAction<DateData | null>>;
  selectedIndex?: string | null;
  setSelectedIndex?: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditAddress: React.Dispatch<React.SetStateAction<boolean>>;
  isShowMapModal: boolean;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressModalOpen: boolean;
  selectedSubPlan?: any;
  setSelectedSubPlan?: React.Dispatch<React.SetStateAction<any>>;
  onFormDataChange?: (formData: any) => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    billing_email: '',
    billing_first_name: '',
    billing_last_name: '',
    billing_country: 'NL',
    billing_address_1: '',
    billing_address_2: '',
    billing_city: '',
    billing_state: '',
    billing_postcode: '',
    billing_phone: '',
    billing_company: '',
    billing_company_kvk: '',
    billing_company_vat: '',
    shipping_email: '',
    shipping_first_name: '',
    shipping_last_name: '',
    shipping_country: 'NL',
    shipping_address_1: '',
    shipping_address_2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_postcode: '',
    shipping_phone: '',
    shipping_company: '',
    shipping_company_kvk: '',
    shipping_company_vat: '',
    delivery_time: "17:00 - 22:00",
    paymentMethod: 'ideal',
  });

  const [customerType, setCustomerType] = useState<'individual' | 'business'>('individual');
  const [otherAddress, setOtherAddress] = useState(false);
  const [prioritizedOrder, setPriorizedOrder] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [defaultDate, setDefaultDate] = useState<string>('');

  const user = useSelector((s: RootState) => s.user?.user);
  const cartItems = useSelector((s: RootState) => s.cart.cartItems);
  const shippingCountry = useSelector((s: RootState) => s.cart.shippingCountry);
  const [action] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { updateShippingCountry } = useCartLogic();

  // Initialize holidays and default date
  useEffect(() => {
    const holidayDates = generateHolidays(formData.billing_country);
    setHolidays(holidayDates);
    
    // Set default date to next available delivery day
    const nextDay = getNextDay();
    setDefaultDate(nextDay);
    
    // If no delivery date is set, set the default
    if (!deliveryDate) {
      setDeliveryDate(nextDay);
    }
  }, [formData.billing_country]);

  // Update delivery date when date prop changes (from CartStep1)
  useEffect(() => {
    if (date && date.dateString) {
      setDeliveryDate(date.dateString);
    }
  }, [date]);

  // Sync form data with cart state shipping country
  useEffect(() => {
    if (shippingCountry) {
      setFormData(prev => ({
        ...prev,
        billing_country: shippingCountry,
        shipping_country: shippingCountry
      }));
    }
  }, [shippingCountry]);

  // Enhanced input styles for better design
  const inputStyle = {
    height: 56,
    px: 16,
    py: 0,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 16,
    fontWeight: '400' as any,
    color: '#1F2937',
    focusStyle: {
      borderColor: '#FD4F01',
    },
    placeholderTextColor: '#9CA3AF',
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  };

  // Handle form input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Handle radio changes
  const handleRadioChange = (field: string, value: string) => {
    if (field === 'customerType') {
      setCustomerType(value as 'individual' | 'business');
    } else if (field === 'deliveryAddress') {
      setOtherAddress(value === 'different');
    } else if (field === 'paymentMethod') {
      setFormData((prev) => ({ ...prev, paymentMethod: value }));
    }
  };

  // Copy billing to shipping
  const copyBillingToShipping = () => {
    setFormData((prev) => ({
      ...prev,
      shipping_email: prev.billing_email,
      shipping_first_name: prev.billing_first_name,
      shipping_last_name: prev.billing_last_name,
      shipping_country: prev.billing_country,
      shipping_address_1: prev.billing_address_1,
      shipping_address_2: prev.billing_address_2,
      shipping_city: prev.billing_city,
      shipping_state: prev.billing_state,
      shipping_postcode: prev.billing_postcode,
      shipping_phone: prev.billing_phone,
      shipping_company: prev.billing_company,
      shipping_company_kvk: prev.billing_company_kvk,
      shipping_company_vat: prev.billing_company_vat,
    }));
  };

  // Auto-copy billing to shipping when not using different address
  useEffect(() => {
    if (!otherAddress) {
      copyBillingToShipping();
    }
  }, [formData.billing_email, formData.billing_first_name, formData.billing_last_name, 
      formData.billing_address_1, formData.billing_address_2, formData.billing_city, 
      formData.billing_postcode, formData.billing_phone, otherAddress]);

  // Update parent with form data changes
  useEffect(() => {
    if (onFormDataChange) {
      const completeFormData = {
        ...formData,
        customerType,
        deliveryDate,
      };
      onFormDataChange(completeFormData);
    }
  }, [formData, customerType, deliveryDate, onFormDataChange]);

  // Validate form
  const validateForm = () => {
    const errors: FormErrors = {};

    // Required fields
    if (!formData.billing_email) errors.billing_email = 'E-mailadres is verplicht';
    if (!formData.billing_first_name) errors.billing_first_name = 'Voornaam is verplicht';
    if (!formData.billing_last_name) errors.billing_last_name = 'Achternaam is verplicht';
    if (!formData.billing_address_1) errors.billing_address_1 = 'Straatnaam is verplicht';
    if (!formData.billing_address_2) errors.billing_address_2 = 'Huisnummer is verplicht';
    if (!formData.billing_city) errors.billing_city = 'Plaats is verplicht';
    if (!formData.billing_postcode) errors.billing_postcode = 'Postcode is verplicht';
    if (!formData.billing_phone) errors.billing_phone = 'Telefoonnummer is verplicht';
    if (!deliveryDate) errors.deliveryDate = 'Bezorgdatum is verplicht';

    // Email validation
    if (formData.billing_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billing_email)) {
      errors.billing_email = 'Ongeldig e-mailadres';
    }

    // Shipping validation if different address
    if (otherAddress) {
      if (!formData.shipping_email) errors.shipping_email = 'Verzend e-mail is verplicht';
      if (!formData.shipping_first_name) errors.shipping_first_name = 'Verzend voornaam is verplicht';
      if (!formData.shipping_last_name) errors.shipping_last_name = 'Verzend achternaam is verplicht';
      if (!formData.shipping_address_1) errors.shipping_address_1 = 'Verzend straatnaam is verplicht';
      if (!formData.shipping_address_2) errors.shipping_address_2 = 'Verzend huisnummer is verplicht';
      if (!formData.shipping_city) errors.shipping_city = 'Verzend plaats is verplicht';
      if (!formData.shipping_postcode) errors.shipping_postcode = 'Verzend postcode is verplicht';
      if (!formData.shipping_phone) errors.shipping_phone = 'Verzend telefoonnummer is verplicht';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form submission started...');
    console.log('Form data:', formData);
    console.log('Delivery date:', deliveryDate);
    
    // Simplified validation - only check essential fields
    const errors: FormErrors = {};
    
    if (!formData.billing_email?.trim()) {
      errors.billing_email = 'E-mailadres is verplicht';
    }
    if (!formData.billing_first_name?.trim()) {
      errors.billing_first_name = 'Voornaam is verplicht';
    }
    if (!formData.billing_last_name?.trim()) {
      errors.billing_last_name = 'Achternaam is verplicht';
    }
    
    console.log('Validation errors:', errors);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
                    Toast.show({
                      type: 'error',
        text1: 'Vul de basis gegevens in',
        text2: 'Email, voornaam en achternaam zijn verplicht',
                    });
                    return;
                  }

    console.log('Validation passed, proceeding to step 2...');
    setCurrentStep(2); // Go to payment step
    
    Toast.show({
      type: 'success',
      text1: 'Formulier opgeslagen',
      text2: 'Ga door naar betaling',
    });
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <YStack gap="$4" mb="$6" p="$4" backgroundColor="white" borderRadius={16} borderWidth={1} borderColor="#F3F4F6">
      <Text fontSize={20} fontWeight="700" color="#111827" letterSpacing={-0.5}>
        {title}
      </Text>
      {children}
          </YStack>
  );

  const renderInput = (
    name: keyof FormData,
    placeholder: string,
    required = false,
    keyboardType: KeyboardTypeOptions = 'default',
    fullWidth = true
  ) => (
    <YStack gap="$2" flex={fullWidth ? 1 : undefined} width={fullWidth ? '100%' : '48%'}>
      <Text fontSize={14} fontWeight="600" color="#374151" mb="$1">
        {placeholder} {required && <Text color="#EF4444">*</Text>}
      </Text>
      <Input
        {...(formErrors[name] ? errorInputStyle : inputStyle)}
        value={formData[name]}
        onChangeText={(value) => handleInputChange(name, value)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        width="100%"
      />
      {formErrors[name] && (
        <XStack alignItems="center" gap="$2" mt="$1">
          <AntDesign name="exclamationcircleo" size={14} color="#EF4444" />
          <Text fontSize={12} color="#EF4444" fontWeight="500">
            {formErrors[name]}
          </Text>
        </XStack>
      )}
    </YStack>
  );

  // Enhanced custom dropdown component
  const CustomDropdown = ({ 
    value, 
    onValueChange, 
    options, 
    placeholder, 
    required = false,
    error
  }: {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder: string;
    required?: boolean;
    error?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
      <YStack gap="$2">
        <Text fontSize={14} fontWeight="600" color="#374151" mb="$1">
          {placeholder} {required && <Text color="#EF4444">*</Text>}
        </Text>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <View
            {...(error ? errorInputStyle : inputStyle)}
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center">
            <Text color={value ? '#1F2937' : '#9CA3AF'} fontSize={16} fontWeight="400">
              {value ? options.find(opt => opt.value === value)?.label : placeholder}
            </Text>
            <AntDesign name="down" size={16} color="#6B7280" />
          </View>
        </TouchableOpacity>
        {error && (
          <XStack alignItems="center" gap="$2" mt="$1">
            <AntDesign name="exclamationcircleo" size={14} color="#EF4444" />
            <Text fontSize={12} color="#EF4444" fontWeight="500">
              {error}
            </Text>
          </XStack>
        )}

        <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay
              animation="quick"
              opacity={0.6}
              backgroundColor="rgba(0, 0, 0, 0.6)"
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
              enterStyle={{ y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ y: 10, opacity: 0, scale: 0.95 }}
              p="$5"
              borderRadius={20}
              backgroundColor="white"
              maxWidth={340}
              width="90%">
              <YStack gap="$4">
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={18} fontWeight="700" color="#111827">
                    {placeholder}
                  </Text>
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <View p="$2" borderRadius={20} backgroundColor="#F3F4F6">
                      <AntDesign name="close" size={18} color="#6B7280" />
                    </View>
                  </TouchableOpacity>
                </XStack>

                <YStack gap="$2">
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => {
                        onValueChange(option.value);
                        setIsOpen(false);
                      }}>
                      <View
                        p="$4"
                        borderRadius={12}
                        backgroundColor={value === option.value ? '#FEF3F0' : '#F9FAFB'}
                        borderWidth={2}
                        borderColor={value === option.value ? '#FD4F01' : 'transparent'}>
                        <Text 
                          fontSize={16} 
                          color={value === option.value ? '#FD4F01' : '#374151'}
                          fontWeight={value === option.value ? '700' : '500'}
                          textAlign="center">
                          {option.label}
                  </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </YStack>
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
    </Dialog>
      </YStack>
    );
  };

  // Enhanced radio group styling
  const renderRadioGroup = (value: string, onValueChange: (value: string) => void, options: { value: string; label: string }[]) => (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      gap="$3">
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => onValueChange(option.value)}>
          <XStack
            alignItems="center"
            gap="$3"
            p="$4"
            borderRadius={12}
            borderWidth={2}
            borderColor={value === option.value ? '#FD4F01' : '#E5E7EB'}
            backgroundColor={value === option.value ? '#FEF3F0' : 'white'}>
            <View
              width={20}
              height={20}
              borderRadius={10}
              borderWidth={2}
              borderColor={value === option.value ? '#FD4F01' : '#D1D5DB'}
              alignItems="center"
              justifyContent="center"
              backgroundColor={value === option.value ? '#FD4F01' : 'transparent'}>
              {value === option.value && (
                <View width={8} height={8} borderRadius={4} backgroundColor="white" />
              )}
            </View>
            <Text
              fontSize={16}
              fontWeight={value === option.value ? '600' : '500'}
              color={value === option.value ? '#FD4F01' : '#374151'}
              flex={1}>
              {option.label}
            </Text>
          </XStack>
          </TouchableOpacity>
      ))}
    </RadioGroup>
  );

  const markedDates = getMarkedDates(deliveryDate, holidays);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack px="$4" py="$3" gap="$4" pb="$8">
          {/* Contact Section */}
          {renderSection(
            'Contact',
            <YStack gap="$4">
              {!user?.user?.email && (
                <View p="$3" backgroundColor="#EEF2FF" borderRadius={8} borderLeftWidth={4} borderLeftColor="#3B82F6">
                  <Text fontSize={14} color="#1E40AF" fontWeight="500">
                    💡 Log in op je account om Loyaliteitspunten te sparen
                  </Text>
                </View>
              )}
              {renderInput('billing_email', 'Emailadres', true, 'email-address')}
        </YStack>
          )}

          {/* Order Type Section */}
          {renderSection(
            'Besteltype',
            renderRadioGroup(
              customerType,
              (value) => handleRadioChange('customerType', value),
              [
                { value: 'individual', label: 'Particulier' },
                { value: 'business', label: 'Bedrijf' },
              ]
            )
          )}

          {/* Personal Info Section */}
          {renderSection(
            'Persoonlijke gegevens',
            <YStack gap="$4">
              <XStack gap="$3" width="100%" justifyContent="space-between">
                {renderInput('billing_first_name', 'Voornaam', true, 'default', false)}
                {renderInput('billing_last_name', 'Achternaam', true, 'default', false)}
              </XStack>

              {customerType === 'business' && (
                <YStack gap="$4" p="$4" backgroundColor="#F0F9FF" borderRadius={12} borderWidth={1} borderColor="#E0F2FE">
                  <Text fontSize={16} fontWeight="600" color="#0369A1">
                    Bedrijfsgegevens
            </Text>
                  {renderInput('billing_company', 'Bedrijfsnaam')}
                  <XStack gap="$3" width="100%" justifyContent="space-between">
                    {renderInput('billing_company_kvk', 'KVK-nummer', false, 'default', false)}
                    {renderInput('billing_company_vat', 'BTW-nummer', false, 'default', false)}
                  </XStack>
                </YStack>
              )}
            </YStack>
          )}

          {/* Billing Address Section */}
          {renderSection(
            'Factuuradres',
            <YStack gap="$4">
              <CustomDropdown
                value={formData.billing_country}
                onValueChange={(value) => {
                  handleInputChange('billing_country', value);
                  // Update shipping country when billing country changes
                  updateShippingCountry(value);
                }}
                options={[
                  { label: '🇳🇱 Nederland', value: 'NL' },
                  { label: '🇧🇪 België', value: 'BE' },
                ]}
                placeholder="Land"
                required
                error={formErrors.billing_country}
              />

              <XStack gap="$3" width="100%" justifyContent="space-between">
                {renderInput('billing_postcode', 'Postcode', true, 'default', false)}
                {renderInput('billing_address_2', 'Huisnummer & Toev', true, 'default', false)}
              </XStack>

              {renderInput('billing_address_1', 'Straatnaam', true)}

              <XStack gap="$3" width="100%" justifyContent="space-between">
                {renderInput('billing_city', 'Plaats', true, 'default', false)}
                {renderInput('billing_phone', 'Telefoonnummer', true, 'phone-pad', false)}
              </XStack>
            </YStack>
          )}

          {/* Delivery Section */}
          {renderSection(
            'Bezorging 🚚',
            <YStack gap="$4">
              <YStack gap="$2">
                <Text fontSize={14} fontWeight="600" color="#374151" mb="$1">
                  Selecteer bezorgdatum <Text color="#EF4444">*</Text>
                </Text>
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                  <View
                    {...(formErrors.deliveryDate ? errorInputStyle : inputStyle)}
                    justifyContent="space-between"
                    flexDirection="row"
                    alignItems="center">
                    <Text color={deliveryDate ? '#1F2937' : '#9CA3AF'} fontSize={16}>
                      {deliveryDate ? formatDateForDisplay(deliveryDate) : 'Selecteer bezorgdatum'}
                    </Text>
                    <AntDesign name="calendar" size={18} color="#6B7280" />
                  </View>
                </TouchableOpacity>
                {formErrors.deliveryDate && (
                  <XStack alignItems="center" gap="$2" mt="$1">
                    <AntDesign name="exclamationcircleo" size={14} color="#EF4444" />
                    <Text fontSize={12} color="#EF4444" fontWeight="500">
                      {formErrors.deliveryDate}
              </Text>
                  </XStack>
                )}
              </YStack>

              <CustomDropdown
                value={formData.delivery_time}
                onValueChange={(value) => handleInputChange('delivery_time', value)}
                options={[
                  { label: '🕔 17:00 - 22:00', value: '17:00 - 22:00' },
                ]}
                placeholder="Bezorgtijd"
                required
              />

              <YStack gap="$3">
                <Text fontSize={14} fontWeight="600" color="#374151">
                  Bezorgadres
            </Text>
                {renderRadioGroup(
                  otherAddress ? 'different' : 'same',
                  (value) => handleRadioChange('deliveryAddress', value),
                  [
                    { value: 'same', label: 'Hetzelfde als factuuradres' },
                    { value: 'different', label: 'Ander bezorgadres' },
                  ]
                )}
              </YStack>
            </YStack>
          )}

          {/* Shipping Address Section (conditional) */}
          {otherAddress &&
            renderSection(
              'Bezorgadres 📦',
              <YStack gap="$4">
                <CustomDropdown
                  value={formData.shipping_country}
                  onValueChange={(value) => {
                    handleInputChange('shipping_country', value);
                    // Update shipping country when shipping country changes
                    updateShippingCountry(value);
                  }}
                  options={[
                    { label: '🇳🇱 Nederland', value: 'NL' },
                    { label: '🇧🇪 België', value: 'BE' },
                  ]}
                  placeholder="Land"
                  required
                />

                {renderInput('shipping_email', 'Email', true, 'email-address')}

                <XStack gap="$3" width="100%" justifyContent="space-between">
                  {renderInput('shipping_first_name', 'Voornaam', true, 'default', false)}
                  {renderInput('shipping_last_name', 'Achternaam', true, 'default', false)}
                </XStack>

                <XStack gap="$3" width="100%" justifyContent="space-between">
                  {renderInput('shipping_postcode', 'Postcode', true, 'default', false)}
                  {renderInput('shipping_address_2', 'Huisnummer & Toev', true, 'default', false)}
                </XStack>

                {renderInput('shipping_address_1', 'Straatnaam', true)}

                <XStack gap="$3" width="100%" justifyContent="space-between">
                  {renderInput('shipping_city', 'Plaats', true, 'default', false)}
                  {renderInput('shipping_phone', 'Telefoonnummer', true, 'phone-pad', false)}
                </XStack>
          </YStack>
            )}

          {/* Payment Section */}
          {/* {renderSection(
            'Betaling 💳',
            <YStack gap="$3">
              {[
                { value: 'ideal', label: 'iDEAL', emoji: '🏦' },
                { value: 'klarna', label: 'Klarna', emoji: '💳' },
                { value: 'idealin3', label: 'iDEAL IN3', emoji: '📊' },
                { value: 'bancontact', label: 'Bancontact Kaart', emoji: '💎' },
                { value: 'creditcard', label: 'Creditcard', emoji: '💳' },
                { value: 'paypal', label: 'PayPal', emoji: '🅿️' },
              ].map((method) => (
                <TouchableOpacity
                  key={method.value}
                  onPress={() => handleRadioChange('paymentMethod', method.value)}>
                  <XStack
                    alignItems="center"
                    gap="$3"
                    p="$4"
            borderRadius={12}
                    borderWidth={2}
                    borderColor={formData.paymentMethod === method.value ? '#FD4F01' : '#E5E7EB'}
                    backgroundColor={formData.paymentMethod === method.value ? '#FEF3F0' : 'white'}>
                    <View
                      width={20}
                      height={20}
                      borderRadius={10}
                      borderWidth={2}
                      borderColor={formData.paymentMethod === method.value ? '#FD4F01' : '#D1D5DB'}
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor={formData.paymentMethod === method.value ? '#FD4F01' : 'transparent'}>
                      {formData.paymentMethod === method.value && (
                        <View width={8} height={8} borderRadius={4} backgroundColor="white" />
                      )}
                    </View>
                    <Text fontSize={18} mr="$2">{method.emoji}</Text>
                    <Text
            fontSize={16}
                      fontWeight={formData.paymentMethod === method.value ? '600' : '500'}
                      color={formData.paymentMethod === method.value ? '#FD4F01' : '#374151'}
                      flex={1}>
                      {method.label}
                    </Text>
                  </XStack>
                </TouchableOpacity>
              ))}
            </YStack>
          )} */}
        </YStack>
      </ScrollView>

      {/* Enhanced Submit Button */}
      <View px="$4" py="$4" backgroundColor="white" borderTopWidth={1} borderTopColor="#F3F4F6">
        <Button
          onPress={handleSubmit}
          backgroundColor="#FD4F01"
          borderRadius={16}
          height={56}
          fontSize={16}
          fontWeight="700"
          color="white"
          disabled={isLoading}
          pressStyle={{
            backgroundColor: '#E5450A',
            scale: 0.98,
          }}>
          {isLoading ? (
            <XStack alignItems="center" gap="$3">
              <Spinner size="small" color="white" />
              <Text color="white" fontWeight="700" fontSize={16}>Laden...</Text>
            </XStack>
          ) : (
            <XStack alignItems="center" gap="$2">
              <Text color="white" fontWeight="700" fontSize={16}>Doorgaan naar betaling</Text>
              <AntDesign name="arrowright" size={18} color="white" />
            </XStack>
          )}
        </Button>
      </View>

      {/* Enhanced Calendar Modal */}
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
                  setDeliveryDate(day.dateString);
                  // Update parent date state
                  if (setDate) {
                    setDate({ dateString: day.dateString } as DateData);
                  }
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
    </SafeAreaView>
  );
}
