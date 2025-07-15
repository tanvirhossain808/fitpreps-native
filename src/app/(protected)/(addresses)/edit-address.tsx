import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Fieldset,
  Input,
  Label,
  RadioGroup,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import Mark from 'public/images/mark.svg';
import { router } from 'expo-router';
import EditSuccess from '~/src/components/addresses/EditSucessModal';
import useKeyboardBehavior from '../../../hooks/useKeyBoardBehavior';
export default function EditAddress() {
  // const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEditSuccessOpen, setIsEditSuccessOpen] = useState(false);
  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardVisible(true);
  //   });

  //   const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardVisible(false);
  //   });

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);
  const renderFormFields = () => {
    const fields = [];
    let i = 0;

    while (i < addressFields.length) {
      const currentField = addressFields[i];

      if (currentField.id === 'city') {
        fields.push(
          <XStack key="city-zip-row" gap="$3" width="100%">
            {['city', 'zipCode'].map((fieldId) => {
              //   const field = formFields.find((f) => f.id === fieldId);
              return (
                <Fieldset key={fieldId} flex={1}>
                  <Input
                    {...inputStyle}
                    id={fieldId}
                    // value={formData[fieldId as keyof typeof formData] as string}
                    // onChangeText={(text) => handleInputChange(fieldId, text)}
                    placeholder={fieldId}
                    // keyboardType={field?.keyboardType}
                  />
                </Fieldset>
              );
            })}
          </XStack>
        );
        i += 2;
        continue;
      }

      if (currentField.fullWidth) {
        fields.push(
          <Fieldset key={currentField.id}>
            <Input
              {...inputStyle}
              id={currentField.id}
              //   value={formData[currentField.id as keyof typeof formData] as string}
              //   onChangeText={(text) => handleInputChange(currentField.id, text)}
              placeholder={currentField.placeholder}
              keyboardType={currentField.keyboardType}
            />
          </Fieldset>
        );
      }

      i++;
    }

    return fields;
  };
  const { keyboardBehavior } = useKeyboardBehavior();
  return (
    <YStack f={1} py={0} my={0} pb={0}>
      <KeyboardAvoidingView
        style={{ ...style.container }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        behavior={keyboardBehavior as 'padding' | 'height' | 'position' | undefined}>
        <YStack f={1}>
          <SafeAreaView style={style.container}>
            <DrawerPageHeader title="Edit Address" />
            <YStack f={1} px="$4" justifyContent="space-between" gap="$5">
              <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                contentContainerStyle={{ flexGrow: 1 }}>
                <YStack py="$5" gap="$7">
                  <YStack gap="$3">
                    <Text fontSize={16} fontWeight={700} color="#1E1F20">
                      Contact Details
                    </Text>
                    {contactFeilds.map((field) => (
                      <Input
                        key={field.id}
                        placeholder={field.placeholder}
                        // value={formData[field.id as keyof typeof formData] as string}
                        // onChangeText={(text) => handleInputChange(field.id, text)}
                        {...inputStyle}
                      />
                    ))}
                  </YStack>
                  <YStack gap="$3">
                    <XStack alignItems="center" justifyContent="space-between" gap="$2">
                      <Text fontSize={16} fontWeight={700} color="#1E1F20">
                        Address
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: '/current-location',
                            params: {},
                          })
                        }>
                        <XStack alignItems="center" gap="$2">
                          <Mark />
                          <Text fontSize={14} fontWeight={700} color="#FD4F01">
                            Use Current Location
                          </Text>
                        </XStack>
                      </TouchableOpacity>
                    </XStack>

                    {/* <XStack flexWrap="wrap" width="100%" gap="$2"> */}
                    {renderFormFields()}
                    {/* </XStack> */}
                  </YStack>

                  <YStack gap="$3">
                    <Text fontSize={16} fontWeight="bold" color="#1E1F20">
                      Address Type
                    </Text>
                    <RadioGroup
                      //   value={formData.addressType}
                      //   onValueChange={(value) => handleInputChange('addressType', value)}
                      flexDirection="row"
                      gap="$4">
                      {['home', 'work', 'other'].map((type) => (
                        <XStack key={type} alignItems="center" space="$2">
                          <RadioGroup.Item
                            value={type}
                            id={type}
                            borderColor={'#FD4F01'}
                            borderWidth={1}
                            width={14}
                            height={14}
                            borderRadius={8}>
                            {/* {formData.addressType === type && ( */}
                            <RadioGroup.Indicator
                              backgroundColor="#FD4F01"
                              width={10}
                              height={10}
                              borderRadius={5}
                            />
                            {/* )} */}
                          </RadioGroup.Item>
                          <Label htmlFor={type} color={'#1E1F20'} fontSize={14} fontWeight={500}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Label>
                        </XStack>
                      ))}
                    </RadioGroup>
                  </YStack>
                </YStack>
              </ScrollView>
              <XStack py="$5" gap={10}>
                <Button
                  w="48%"
                  onPress={() => router.back()}
                  // onPress={handleSubmit}
                  backgroundColor="white"
                  elevation={2}
                  shadowColor="#FF7435"
                  shadowOffset={{ width: 0, height: 0 }}
                  shadowOpacity={1}
                  shadowRadius={2}
                  borderRadius={8}
                  fontSize={16}
                  fontWeight={700}
                  borderWidth={1}
                  borderColor="#FD4F01"
                  color="#FD4F01"
                  pressStyle={{
                    elevation: 2,
                    shadowColor: '#FF7435',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    backgroundColor: '#FD4F01', // Prevent dark flash
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={() => setIsEditSuccessOpen(true)}
                  w="48%"
                  // onPress={handleSubmit}
                  backgroundColor="#FD4F01"
                  elevation={2}
                  shadowColor="#FF7435"
                  shadowOffset={{ width: 0, height: 0 }}
                  shadowOpacity={1}
                  shadowRadius={2}
                  borderRadius={8}
                  fontSize={16}
                  fontWeight={700}
                  borderWidth={1}
                  borderColor="#FD4F01"
                  color="white"
                  pressStyle={{
                    elevation: 2,
                    shadowColor: '#FF7435',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    backgroundColor: '#FD4F01', // Prevent dark flash
                  }}>
                  Save Address
                </Button>
              </XStack>
            </YStack>
          </SafeAreaView>
        </YStack>
      </KeyboardAvoidingView>
      <EditSuccess
        open={isEditSuccessOpen}
        onOpenChange={setIsEditSuccessOpen}
        setIsEditAddress={() => {}}
        setConFirmAddress={() => {}}
        setIsAddressModalOpen={() => {}}
      />
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const addressFields = [
  {
    id: 'apartment',
    placeholder: 'Enter apartment/house number',
    fullWidth: true,
  },
  {
    id: 'addressLine2',
    placeholder: 'Block no., Street name, Area/Locality',
    fullWidth: true,
  },
  {
    id: 'city',
    placeholder: 'City',
    fullWidth: false,
  },
  {
    id: 'zipCode',
    placeholder: 'ZIP code',
    keyboardType: 'number-pad' as const,
    fullWidth: false,
  },
  {
    id: 'state',
    placeholder: 'State',
    fullWidth: true,
  },
];
const contactFeilds = [
  {
    id: 'name',
    placeholder: 'Name',
  },
  {
    id: 'email',
    placeholder: 'Email',
  },
];
const inputStyle = {
  py: 10,
  elevation: 2,
  shadowColor: 'rgba(10, 13, 18, 0.05)',
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 2,
  shadowOpacity: 1,
  placeholderTextColor: '#8E95A2',
  backgroundColor: 'white',
  borderColor: '#EDEEF1',
  borderRadius: 8,
  borderWidth: 1,
};
