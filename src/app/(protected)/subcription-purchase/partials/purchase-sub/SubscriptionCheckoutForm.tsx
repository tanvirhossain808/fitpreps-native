import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { 
  View, 
  Text, 
  Button, 
  YStack, 
  XStack, 
  Input, 
  Separator
} from 'tamagui';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import Coin from 'public/images/coin.svg';
import { baseUrl } from '~/src/constants/baseConstant';

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
  newsletter: boolean;
}

interface SubscriptionCheckoutFormProps {
  totalCost?: any;
  totalPoints?: any;
  plan?: any;
  type?: any;
  bonusPoints?: any;
  regularPoints?: any;
  originalPrice?: any;
  user: any;
}

// Helper function to get upcoming Mondays (replacing luxon)
const getUpcomingMondays = (): string[] => {
  const mondays = [];
  const today = new Date();
  
  // Find next Monday
  const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
  let currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + daysUntilMonday);
  
  // Generate 10 upcoming Mondays
  for (let i = 0; i < 10; i++) {
    const dateStr = currentMonday.toISOString().split('T')[0];
    mondays.push(dateStr);
    currentMonday.setDate(currentMonday.getDate() + 7);
  }
  
  return mondays;
};

// Helper function to format date in Dutch
const formatDutchDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Amsterdam',
  }).toUpperCase();
};

export default function SubscriptionCheckoutForm({
  totalCost,
  totalPoints,
  plan,
  type,
  bonusPoints,
  regularPoints,
  originalPrice,
  user
}: SubscriptionCheckoutFormProps) {
  const [sameAddress, setSameAddress] = useState(true);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [isAddressManuallyEntered, setIsAddressManuallyEntered] = useState(false);
  const [isAddressManuallyEntered2, setIsAddressManuallyEntered2] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [mondays, setMondays] = useState<string[]>([]);
  
  // Dropdown states
  const [showStartDateDropdown, setShowStartDateDropdown] = useState(false);
  const [showBillingCountryDropdown, setShowBillingCountryDropdown] = useState(false);
  const [showShippingCountryDropdown, setShowShippingCountryDropdown] = useState(false);

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
    delivery_time: "17:00-18:00",
    newsletter: false
  });

  // Generate upcoming Mondays
  useEffect(() => {
    const upcomingMondays = getUpcomingMondays();
    setMondays(upcomingMondays);
  }, []);

  // Set start date based on plan
  useEffect(() => {
    if (plan === "weekly") {
      setStartDate(mondays[0] || '');
    } else {
      setStartDate(new Date().toISOString().split('T')[0]);
    }
  }, [mondays, plan]);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addPrefixToKeys = (obj: any, prefix: string) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[`${prefix}${key}`] = value;
      return acc;
    }, {} as any);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    // Required fields validation
    if (!formData.billing_email) errors.billing_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.billing_email)) errors.billing_email = 'Email is invalid';

    if (!formData.billing_first_name) errors.billing_first_name = 'First name is required';
    if (!formData.billing_last_name) errors.billing_last_name = 'Last name is required';
    if (!formData.billing_address_1) errors.billing_address_1 = 'Address is required';
    if (!formData.billing_address_2) errors.billing_address_2 = 'Address is required';
    if (!formData.billing_city) errors.billing_city = 'Plaats is required';
    if (!formData.billing_postcode) errors.billing_postcode = 'Postal code is required';
    if (!formData.billing_phone) errors.billing_phone = 'Phone number is required';
    if (!startDate) errors.startDate = 'Start Date is required';

    // Business account validations
    if (isBusinessAccount) {
      if (!formData.billing_company) errors.billing_company = 'Company name is required';
      if (!formData.billing_company_kvk) errors.billing_company_kvk = 'KVK number is required';
      if (!formData.billing_company_vat) errors.billing_company_vat = 'VAT number is required';
    }

    // Validate shipping fields only if shipping address is different
    if (!sameAddress) {
      if (!formData.shipping_first_name) errors.shipping_first_name = 'First name is required';
      if (!formData.shipping_last_name) errors.shipping_last_name = 'Last name is required';
      if (!formData.shipping_address_1) errors.shipping_address_1 = 'Address is required';
      if (!formData.shipping_address_2) errors.shipping_address_2 = 'Address is required';
      if (!formData.shipping_city) errors.shipping_city = 'Plaats is required';
      if (!formData.shipping_postcode) errors.shipping_postcode = 'Postal code is required';
      if (!formData.shipping_phone) errors.shipping_phone = 'Phone number is required';

      if (isBusinessAccount) {
        if (!formData.shipping_company) errors.shipping_company = 'Company name is required';
        if (!formData.shipping_company_kvk) errors.shipping_company_kvk = 'KVK number is required';
        if (!formData.shipping_company_vat) errors.shipping_company_vat = 'VAT number is required';
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    if (!user?._id) {
      router.push("/mijn-account");
      return;
    }

    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // If there are errors, stop submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submissionData = {
        ...formData
      };

      // If shipping address is same as billing, copy billing to shipping
      submissionData.shipping_email = formData.billing_email;
      if (sameAddress) {
        submissionData.shipping_email = formData.billing_email;
        submissionData.shipping_first_name = formData.billing_first_name;
        submissionData.shipping_last_name = formData.billing_last_name;
        submissionData.shipping_country = formData.billing_country;
        submissionData.shipping_address_1 = formData.billing_address_1;
        submissionData.shipping_address_2 = formData.billing_address_2;
        submissionData.shipping_city = formData.billing_city;
        submissionData.shipping_state = formData.billing_state;
        submissionData.shipping_postcode = formData.billing_postcode;
        submissionData.shipping_phone = formData.billing_phone;

        if (isBusinessAccount) {
          submissionData.shipping_company = formData.billing_company;
          submissionData.shipping_company_kvk = formData.billing_company_kvk;
          submissionData.shipping_company_vat = formData.billing_company_vat;
        }
      }

      const data = submissionData.billing_email ? addPrefixToKeys(submissionData, "_") : {};
      
      // Send form data to server
      const response = await fetch(`${baseUrl}/api/subscription/purchase-points`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          startDate: plan === "weekly" ? startDate : new Date().toISOString().split('T')[0], 
          userId: user._id, 
          totalPoints: parseFloat(totalPoints || '0').toFixed(2), 
          frequency: plan, 
          amount: parseFloat(totalCost || '0').toFixed(2), 
          data: data,
          type: "fueld"
        }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Network response was not ok');
        return;
      }

      const result = await response.json();
      if (result.checkoutUrl) {
        router.push({
          pathname: '/verifyPayment/verifyPayment',
          params: {
            redirectUrl: result.checkoutUrl,
          },
        });
      }

    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return formErrors[fieldName] ? (
      <Text color="red" fontSize={12} mt="$1">{formErrors[fieldName]}</Text>
    ) : null;
  };

  const parsedTotalCost = parseFloat(totalCost || '0');
  const parsedTotalPoints = parseInt(totalPoints || '0');
  const parsedBonusPoints = parseInt(bonusPoints || '0');
  const parsedRegularPoints = parseInt(regularPoints || '0');
  const isWeekly = plan === 'weekly';
  const shippingCost = parsedTotalCost < 50 ? 6.95 : 0;

  return (
    <ScrollView style={{ flex: 1 }}>
      <YStack p="$4" gap="$6">
        {/* Header with Back Button */}
        <YStack>
          <XStack alignItems="center" justifyContent="space-between" mb="$4">
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8
              }}
            >
              <Text fontSize={20} color="#FD4F01" mr="$2">←</Text>
              <Text fontSize={16} color="#FD4F01" fontWeight={600}>Terug</Text>
            </TouchableOpacity>
          </XStack>
          <Text fontSize={24} fontWeight={700} color="#1E1F20">
            Afrekenen
          </Text>
          <Text fontSize={16} color="#25272C" mt="$2">
            Vul je gegevens in om je abonnement te starten
          </Text>
        </YStack>

        <YStack gap="$6">
          {/* Form Section */}
          <YStack gap="$6">
            {/* Contact Section */}
            <YStack gap="$4">
              <Text fontSize={20} fontWeight={700} color="#1E1F20">
                Contact
              </Text>
              
              <YStack gap="$3">
                <Input
                  placeholder="Voer e-mailadres in"
                  value={formData.billing_email}
                  onChangeText={(value) => handleChange('billing_email', value)}
                  borderColor={formErrors.billing_email ? "red" : "#D8DBDF"}
                  borderWidth={1}
                  borderRadius={8}
                  p="$3"
                />
                {getFieldError('billing_email')}
              </YStack>

              {/* Start Date for Weekly Plans */}
              {isWeekly && (
                <YStack gap="$3">
                  <Text fontSize={16} fontWeight={600} color="#1E1F20">
                    Startdatum
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowStartDateDropdown(true)}
                    style={{
                      padding: 12,
                      borderWidth: 1,
                      borderColor: formErrors.startDate ? "red" : "#D8DBDF",
                      borderRadius: 8,
                      backgroundColor: "white",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text color={startDate ? "#1E1F20" : "#666"}>
                      {startDate ? formatDutchDate(startDate) : "Selecteer een startdatum"}
                    </Text>
                    <Text>▼</Text>
                  </TouchableOpacity>
                  {getFieldError('startDate')}
                  
                  {/* Start Date Modal */}
                  <Modal
                    visible={showStartDateDropdown}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowStartDateDropdown(false)}
                  >
                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                      <View style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 20,
                        width: '90%',
                        maxHeight: '70%'
                      }}>
                        <Text fontSize={18} fontWeight={700} mb="$4">Selecteer startdatum</Text>
                        <ScrollView>
                          {mondays.map((date, index) => (
                            <TouchableOpacity
                              key={date}
                              onPress={() => {
                                setStartDate(date);
                                setShowStartDateDropdown(false);
                              }}
                              style={{
                                padding: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#E5E5E5',
                                backgroundColor: startDate === date ? '#FFF9F7' : 'white'
                              }}
                            >
                              <Text fontSize={16} color={startDate === date ? "#FD4F01" : "#1E1F20"}>
                                {formatDutchDate(date)}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                        <TouchableOpacity
                          onPress={() => setShowStartDateDropdown(false)}
                          style={{
                            marginTop: 15,
                            padding: 15,
                            backgroundColor: '#FD4F01',
                            borderRadius: 8,
                            alignItems: 'center'
                          }}
                        >
                          <Text color="white" fontSize={16} fontWeight={600}>Sluiten</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </YStack>
              )}

              {/* Account Type */}
              <YStack gap="$3">
                <Text fontSize={16} fontWeight={600} color="#1E1F20">
                  Account Type
                </Text>
                <XStack gap="$4">
                  <TouchableOpacity 
                    onPress={() => setIsBusinessAccount(false)}
                    style={{ flex: 1 }}
                  >
                    <XStack 
                      alignItems="center" 
                      gap="$2" 
                      p="$3" 
                      borderWidth={1}
                      borderColor={!isBusinessAccount ? "#FD4F01" : "#D8DBDF"}
                      borderRadius={8}
                      backgroundColor={!isBusinessAccount ? "#FFF9F7" : "white"}
                    >
                      <View 
                        width={16} 
                        height={16} 
                        borderRadius={8} 
                        borderWidth={2} 
                        borderColor="#FD4F01"
                        backgroundColor={!isBusinessAccount ? "#FD4F01" : "transparent"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {!isBusinessAccount && (
                          <View width={6} height={6} borderRadius={3} backgroundColor="white" />
                        )}
                      </View>
                      <Text fontSize={14} fontWeight={600}>Particulier</Text>
                    </XStack>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => setIsBusinessAccount(true)}
                    style={{ flex: 1 }}
                  >
                    <XStack 
                      alignItems="center" 
                      gap="$2" 
                      p="$3" 
                      borderWidth={1}
                      borderColor={isBusinessAccount ? "#FD4F01" : "#D8DBDF"}
                      borderRadius={8}
                      backgroundColor={isBusinessAccount ? "#FFF9F7" : "white"}
                    >
                      <View 
                        width={16} 
                        height={16} 
                        borderRadius={8} 
                        borderWidth={2} 
                        borderColor="#FD4F01"
                        backgroundColor={isBusinessAccount ? "#FD4F01" : "transparent"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {isBusinessAccount && (
                          <View width={6} height={6} borderRadius={3} backgroundColor="white" />
                        )}
                      </View>
                      <Text fontSize={14} fontWeight={600}>Zakelijk</Text>
                    </XStack>
                  </TouchableOpacity>
                </XStack>
              </YStack>
            </YStack>

            {/* Billing Address Section */}
            <YStack gap="$4">
              <Text fontSize={20} fontWeight={700} color="#1E1F20">
                Factuuradres
              </Text>

              <YStack gap="$3">
                <TouchableOpacity
                  onPress={() => setShowBillingCountryDropdown(true)}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: "#D8DBDF",
                    borderRadius: 8,
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text color={formData.billing_country ? "#1E1F20" : "#666"}>
                    {formData.billing_country === "NL" ? "Nederland" : formData.billing_country === "BE" ? "België" : "Land"}
                  </Text>
                  <Text>▼</Text>
                </TouchableOpacity>
                
                {/* Billing Country Modal */}
                <Modal
                  visible={showBillingCountryDropdown}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setShowBillingCountryDropdown(false)}
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                  }}>
                    <View style={{
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 20,
                      width: '90%',
                      maxHeight: '70%'
                    }}>
                      <Text fontSize={18} fontWeight={700} mb="$4">Selecteer land</Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('billing_country', 'NL');
                          setShowBillingCountryDropdown(false);
                        }}
                        style={{
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: '#E5E5E5',
                          backgroundColor: formData.billing_country === 'NL' ? '#FFF9F7' : 'white'
                        }}
                      >
                        <Text fontSize={16} color={formData.billing_country === 'NL' ? "#FD4F01" : "#1E1F20"}>
                          Nederland
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('billing_country', 'BE');
                          setShowBillingCountryDropdown(false);
                        }}
                        style={{
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: '#E5E5E5',
                          backgroundColor: formData.billing_country === 'BE' ? '#FFF9F7' : 'white'
                        }}
                      >
                        <Text fontSize={16} color={formData.billing_country === 'BE' ? "#FD4F01" : "#1E1F20"}>
                          België
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowBillingCountryDropdown(false)}
                        style={{
                          marginTop: 15,
                          padding: 15,
                          backgroundColor: '#FD4F01',
                          borderRadius: 8,
                          alignItems: 'center'
                        }}
                      >
                        <Text color="white" fontSize={16} fontWeight={600}>Sluiten</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <Input
                  placeholder="Postcode *"
                  value={formData.billing_postcode}
                  onChangeText={(value) => handleChange('billing_postcode', value)}
                  borderColor={formErrors.billing_postcode ? "red" : "#D8DBDF"}
                  borderWidth={1}
                  borderRadius={8}
                  p="$3"
                />
                {getFieldError('billing_postcode')}

                <XStack alignItems="center" gap="$2">
                  <TouchableOpacity
                    onPress={() => setIsAddressManuallyEntered(!isAddressManuallyEntered)}
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 2,
                      borderColor: "#FD4F01",
                      borderRadius: 4,
                      backgroundColor: isAddressManuallyEntered ? "#FD4F01" : "transparent",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {isAddressManuallyEntered && (
                      <Text color="white" fontSize={12}>✓</Text>
                    )}
                  </TouchableOpacity>
                  <Text fontSize={14} color="#25272C">Voer adres handmatig in</Text>
                </XStack>

                <XStack gap="$3">
                  <Input
                    placeholder="Huisnummer & Toevoeging *"
                    value={formData.billing_address_2}
                    onChangeText={(value) => handleChange('billing_address_2', value)}
                    borderColor={formErrors.billing_address_2 ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                    flex={1}
                  />
                  <Input
                    placeholder="Straatnaam"
                    value={formData.billing_address_1}
                    onChangeText={(value) => handleChange('billing_address_1', value)}
                    borderColor={formErrors.billing_address_1 ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                    flex={2}
                  />
                </XStack>
                {getFieldError('billing_address_2')}
                {getFieldError('billing_address_1')}

                <Input
                  placeholder="Plaats"
                  value={formData.billing_city}
                  onChangeText={(value) => handleChange('billing_city', value)}
                  borderColor={formErrors.billing_city ? "red" : "#D8DBDF"}
                  borderWidth={1}
                  borderRadius={8}
                  p="$3"
                />
                {getFieldError('billing_city')}

                <XStack gap="$3">
                  <Input
                    placeholder="Voornaam"
                    value={formData.billing_first_name}
                    onChangeText={(value) => handleChange('billing_first_name', value)}
                    borderColor={formErrors.billing_first_name ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                    flex={1}
                  />
                  <Input
                    placeholder="Achternaam"
                    value={formData.billing_last_name}
                    onChangeText={(value) => handleChange('billing_last_name', value)}
                    borderColor={formErrors.billing_last_name ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                    flex={1}
                  />
                </XStack>
                {getFieldError('billing_first_name')}
                {getFieldError('billing_last_name')}

                {/* Business Fields */}
                {isBusinessAccount && (
                  <YStack gap="$3">
                    <Input
                      placeholder="Bedrijfsnaam"
                      value={formData.billing_company}
                      onChangeText={(value) => handleChange('billing_company', value)}
                      borderColor={formErrors.billing_company ? "red" : "#D8DBDF"}
                      borderWidth={1}
                      borderRadius={8}
                      p="$3"
                    />
                    {getFieldError('billing_company')}

                    <XStack gap="$3">
                      <Input
                        placeholder="KVK-nummer"
                        value={formData.billing_company_kvk}
                        onChangeText={(value) => handleChange('billing_company_kvk', value)}
                        borderColor={formErrors.billing_company_kvk ? "red" : "#D8DBDF"}
                        borderWidth={1}
                        borderRadius={8}
                        p="$3"
                        flex={1}
                      />
                      <Input
                        placeholder="BTW-nummer"
                        value={formData.billing_company_vat}
                        onChangeText={(value) => handleChange('billing_company_vat', value)}
                        borderColor={formErrors.billing_company_vat ? "red" : "#D8DBDF"}
                        borderWidth={1}
                        borderRadius={8}
                        p="$3"
                        flex={1}
                      />
                    </XStack>
                    {getFieldError('billing_company_kvk')}
                    {getFieldError('billing_company_vat')}
                  </YStack>
                )}

                <Input
                  placeholder="Telefoonnummer"
                  value={formData.billing_phone}
                  onChangeText={(value) => handleChange('billing_phone', value)}
                  borderColor={formErrors.billing_phone ? "red" : "#D8DBDF"}
                  borderWidth={1}
                  borderRadius={8}
                  p="$3"
                  keyboardType="phone-pad"
                />
                {getFieldError('billing_phone')}
              </YStack>
            </YStack>

            {/* Shipping Address Section */}
            <YStack gap="$4">
              <Text fontSize={20} fontWeight={700} color="#1E1F20">
                Verzendadres
              </Text>

              <XStack alignItems="center" gap="$2">
                <TouchableOpacity
                  onPress={() => setSameAddress(!sameAddress)}
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: "#FD4F01",
                    borderRadius: 4,
                    backgroundColor: sameAddress ? "#FD4F01" : "transparent",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {sameAddress && (
                    <Text color="white" fontSize={12}>✓</Text>
                  )}
                </TouchableOpacity>
                <Text fontSize={14} color="#25272C">Verzendadres is hetzelfde als factuuradres.</Text>
              </XStack>

              {!sameAddress && (
                <YStack gap="$3">
                  <TouchableOpacity
                    onPress={() => setShowShippingCountryDropdown(true)}
                    style={{
                      padding: 12,
                      borderWidth: 1,
                      borderColor: "#D8DBDF",
                      borderRadius: 8,
                      backgroundColor: "white",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text color={formData.shipping_country ? "#1E1F20" : "#666"}>
                      {formData.shipping_country === "NL" ? "Nederland" : formData.shipping_country === "BE" ? "België" : "Land"}
                    </Text>
                    <Text>▼</Text>
                  </TouchableOpacity>
                  
                  {/* Shipping Country Modal */}
                  <Modal
                    visible={showShippingCountryDropdown}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowShippingCountryDropdown(false)}
                  >
                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                      <View style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        padding: 20,
                        width: '90%',
                        maxHeight: '70%'
                      }}>
                        <Text fontSize={18} fontWeight={700} mb="$4">Selecteer land</Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleChange('shipping_country', 'NL');
                            setShowShippingCountryDropdown(false);
                          }}
                          style={{
                            padding: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: '#E5E5E5',
                            backgroundColor: formData.shipping_country === 'NL' ? '#FFF9F7' : 'white'
                          }}
                        >
                          <Text fontSize={16} color={formData.shipping_country === 'NL' ? "#FD4F01" : "#1E1F20"}>
                            Nederland
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            handleChange('shipping_country', 'BE');
                            setShowShippingCountryDropdown(false);
                          }}
                          style={{
                            padding: 15,
                            borderBottomWidth: 1,
                            borderBottomColor: '#E5E5E5',
                            backgroundColor: formData.shipping_country === 'BE' ? '#FFF9F7' : 'white'
                          }}
                        >
                          <Text fontSize={16} color={formData.shipping_country === 'BE' ? "#FD4F01" : "#1E1F20"}>
                            België
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setShowShippingCountryDropdown(false)}
                          style={{
                            marginTop: 15,
                            padding: 15,
                            backgroundColor: '#FD4F01',
                            borderRadius: 8,
                            alignItems: 'center'
                          }}
                        >
                          <Text color="white" fontSize={16} fontWeight={600}>Sluiten</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <Input
                    placeholder="Postcode *"
                    value={formData.shipping_postcode}
                    onChangeText={(value) => handleChange('shipping_postcode', value)}
                    borderColor={formErrors.shipping_postcode ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                  />
                  {getFieldError('shipping_postcode')}

                  <XStack alignItems="center" gap="$2">
                    <TouchableOpacity
                      onPress={() => setIsAddressManuallyEntered2(!isAddressManuallyEntered2)}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 2,
                        borderColor: "#FD4F01",
                        borderRadius: 4,
                        backgroundColor: isAddressManuallyEntered2 ? "#FD4F01" : "transparent",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {isAddressManuallyEntered2 && (
                        <Text color="white" fontSize={12}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <Text fontSize={14} color="#25272C">Voer verzendadres handmatig in</Text>
                  </XStack>

                  <XStack gap="$3">
                    <Input
                      placeholder="Huisnummer & Toevoeging *"
                      value={formData.shipping_address_2}
                      onChangeText={(value) => handleChange('shipping_address_2', value)}
                      borderColor={formErrors.shipping_address_2 ? "red" : "#D8DBDF"}
                      borderWidth={1}
                      borderRadius={8}
                      p="$3"
                      flex={1}
                    />
                    <Input
                      placeholder="Straatnaam"
                      value={formData.shipping_address_1}
                      onChangeText={(value) => handleChange('shipping_address_1', value)}
                      borderColor={formErrors.shipping_address_1 ? "red" : "#D8DBDF"}
                      borderWidth={1}
                      borderRadius={8}
                      p="$3"
                      flex={2}
                    />
                  </XStack>
                  {getFieldError('shipping_address_2')}
                  {getFieldError('shipping_address_1')}

                  <Input
                    placeholder="Plaats"
                    value={formData.shipping_city}
                    onChangeText={(value) => handleChange('shipping_city', value)}
                    borderColor={formErrors.shipping_city ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                  />
                  {getFieldError('shipping_city')}

                  <XStack gap="$3">
                    <Input
                      placeholder="Voornaam"
                      value={formData.shipping_first_name}
                      onChangeText={(value) => handleChange('shipping_first_name', value)}
                      borderColor={formErrors.shipping_first_name ? "red" : "#D8DBDF"}
                      borderWidth={1}
                      borderRadius={8}
                      p="$3"
                      flex={1}
                    />
                    <Input
                      placeholder="Achternaam"
                      value={formData.shipping_last_name}
                      onChangeText={(value) => handleChange('shipping_last_name', value)}
                      borderColor={formErrors.shipping_last_name ? "red" : "#D8DBDF"}
                      borderWidth={1}
                      borderRadius={8}
                      p="$3"
                      flex={1}
                    />
                  </XStack>
                  {getFieldError('shipping_first_name')}
                  {getFieldError('shipping_last_name')}

                  {/* Business Fields for Shipping */}
                  {isBusinessAccount && (
                    <YStack gap="$3">
                      <Input
                        placeholder="Bedrijfsnaam"
                        value={formData.shipping_company}
                        onChangeText={(value) => handleChange('shipping_company', value)}
                        borderColor={formErrors.shipping_company ? "red" : "#D8DBDF"}
                        borderWidth={1}
                        borderRadius={8}
                        p="$3"
                      />
                      {getFieldError('shipping_company')}

                      <XStack gap="$3">
                        <Input
                          placeholder="KVK-nummer"
                          value={formData.shipping_company_kvk}
                          onChangeText={(value) => handleChange('shipping_company_kvk', value)}
                          borderColor={formErrors.shipping_company_kvk ? "red" : "#D8DBDF"}
                          borderWidth={1}
                          borderRadius={8}
                          p="$3"
                          flex={1}
                        />
                        <Input
                          placeholder="BTW-nummer"
                          value={formData.shipping_company_vat}
                          onChangeText={(value) => handleChange('shipping_company_vat', value)}
                          borderColor={formErrors.shipping_company_vat ? "red" : "#D8DBDF"}
                          borderWidth={1}
                          borderRadius={8}
                          p="$3"
                          flex={1}
                        />
                      </XStack>
                      {getFieldError('shipping_company_kvk')}
                      {getFieldError('shipping_company_vat')}
                    </YStack>
                  )}

                  <Input
                    placeholder="Telefoonnummer"
                    value={formData.shipping_phone}
                    onChangeText={(value) => handleChange('shipping_phone', value)}
                    borderColor={formErrors.shipping_phone ? "red" : "#D8DBDF"}
                    borderWidth={1}
                    borderRadius={8}
                    p="$3"
                    keyboardType="phone-pad"
                  />
                  {getFieldError('shipping_phone')}
                </YStack>
              )}
            </YStack>

            {/* Submit Button */}
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              backgroundColor="#FD4F01"
              color="white"
              fontSize={16}
              fontWeight={700}
            //   p="$4"
              borderRadius={8}
              mt="$4"
            >
              {isSubmitting ? 'Verwerken...' : 'Nu betalen'}
            </Button>
          </YStack>

          {/* Order Summary */}
          <YStack gap="$4" p="$4" backgroundColor="#FFF9F7" borderRadius={12}>
            <YStack>
              <Text fontSize={18} fontWeight={700} color="#1E1F20">
                {isWeekly ? 'Wekelijks' : 'Maandelijks'} abonnement : {type?.toUpperCase()} Pakket
              </Text>
              <Text fontSize={20} fontWeight={700} color="#FD4F01" mt="$2">
                €{(parsedTotalCost - shippingCost).toFixed(2)}
              </Text>
            </YStack>

            <YStack gap="$2">
              <XStack alignItems="center" gap="$2">
                <View width={8} height={8} backgroundColor="#FD4F01" borderRadius={4} />
                <Text fontSize={14} color="#25272C">{parsedRegularPoints}</Text>
                <Coin width={16} height={16} />
              </XStack>
              <XStack alignItems="center" justifyContent="center">
                <Text fontSize={16} fontWeight={700} color="#1E1F20">+</Text>
              </XStack>
              <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" gap="$2">
                  <View width={8} height={8} backgroundColor="#FD4F01" borderRadius={4} />
                  <Text fontSize={14} color="#25272C">{parsedBonusPoints}</Text>
                  <Coin width={16} height={16} />
                </XStack>
                <Text
                  color="#009A21"
                  fontSize={12}
                  fontWeight={700}
                  px="$2"
                  py="$1"
                  borderRadius={20}
                  backgroundColor="#E5F8EA">
                  GRATIS
                </Text>
              </XStack>
            </YStack>

            <Separator />

            <YStack gap="$2">
              <XStack justifyContent="space-between">
                <Text fontSize={14} color="#25272C">Subtotaal</Text>
                <Text fontSize={14} color="#25272C">
                  €{(parsedTotalCost - shippingCost).toFixed(2)}
                </Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontSize={14} color="#25272C">Verzendkosten</Text>
                <Text fontSize={14} color="#25272C">
                  €{shippingCost.toFixed(2)}
                </Text>
              </XStack>
              <Separator />
              <XStack justifyContent="space-between">
                <Text fontSize={16} fontWeight={700} color="#1E1F20">TOTAAL</Text>
                <Text fontSize={16} fontWeight={700} color="#1E1F20">
                  €{parsedTotalCost.toFixed(2)}
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
} 