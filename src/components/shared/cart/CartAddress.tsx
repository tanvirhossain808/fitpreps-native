import {
  Button,
  Dialog,
  Fieldset,
  Input,
  YStack,
  XStack,
  ScrollView,
  Text,
  RadioGroup,
  Label,
  AnimatePresence,
  View,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Mark from 'public/images/mark.svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { AddressType } from '~/src/types/type';
import { addAddress, clearAddress, updateAddress } from '~/src/store/slices/addressSlice';
import { RootState } from '~/src/store';
import Toast from 'react-native-toast-message';
import useGetAddressDetails from '~/src/hooks/useGetAddressDetails';

interface CartAddressProps {
  open: boolean;
  addressId?: string;
  isEditAddress?: boolean;
  setIsEditAddress?: (isEditAddress: boolean) => void;
  address?: any | false;
  onOpenChange: (open: boolean) => void;
  isShowMapModal?: boolean;
  setIsShowMapModal?: (isShowMapModal: boolean) => void;
  setIsAddressModalOpen?: (isAddressModalOpen: boolean) => void;
  onSave: (address: {
    name: string;
    email: string;
    addressType: 'home' | 'work' | 'other';
    apartment: string;
    street: string;
    city: string;
    zipCode: string;
    state: string;
  }) => void;
  setConFirmAddress?: (confirmAddress: boolean) => void;
}

export function CartAddress({
  open,
  addressId,
  onOpenChange,
  onSave,
  address = false,
  setIsEditAddress,
  isEditAddress = false,
  isShowMapModal,
  setIsShowMapModal,
  setIsAddressModalOpen,
  setConFirmAddress,
}: CartAddressProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    addressType: 'home' as 'home' | 'work' | 'other',
    apartment: '',
    street: '',
    city: '',
    zipCode: '',
    state: '',
  });
  const [isEditSuccessOpen, setIsEditSuccessOpen] = React.useState(false);
  const initialError = {
    name: '',
    email: '',
    addressType: '',
    apartment: '',
    street: '',
    city: '',
    zipCode: '',
    state: '',
  };
  const [error, setErrors] = useState(initialError);
  const inputStyle = {
    py: 10,
    // elevation: 2,
    // shadowColor: 'rgba(10, 13, 18, 0.05)',
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: 2,
    // shadowOpacity: 1,
    placeholderTextColor: '#8E95A2',
    backgroundColor: 'white',
    borderColor: '#EDEEF1',
    borderRadius: 8,
    borderWidth: 1,
  };
  // const disPatch = useDispatch();
  let type: AddressType;
  const selector = useSelector((s: RootState) => s.address);
  const formFields = [
    {
      id: 'apartment',
      placeholder: 'Enter apartment/house number',
      fullWidth: true,
    },
    {
      id: 'street',
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
      placeholder: 'Post code',
      keyboardType: 'number-pad' as const,
      fullWidth: false,
    },
    {
      id: 'state',
      placeholder: 'State',
      fullWidth: true,
    },
  ];
  const { data: addressDetails } = useGetAddressDetails(formData.zipCode);
  console.log(addressDetails, 'data');
  useEffect(() => {
    if (isEditAddress) {
      const selectedAddress = selector.find((address) => address?._id === addressId);
      if (selectedAddress)
        setFormData({
          name: selectedAddress?.contactDetails.name,
          email: selectedAddress?.contactDetails.email,
          addressType: selectedAddress?.addressType as any,
          apartment: selectedAddress?.addressDetails.apartment,
          street: selectedAddress?.addressDetails.street,
          city: selectedAddress?.addressDetails.city,
          zipCode: selectedAddress?.addressDetails.zipCode,
          state: selectedAddress?.addressDetails.state,
        });
    }
  }, [isEditAddress, addressId, selector]);

  const disPatch = useDispatch();
  const handleSubmit = () => {
    setErrors(initialError);
    const newErrors: Partial<typeof error> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.addressType?.trim()) {
      newErrors.addressType = 'address type is required';
    }
    if (!formData.apartment?.trim()) {
      newErrors.apartment = 'apartment is required';
    }
    if (!formData.street?.trim()) {
      newErrors.street = 'street is required';
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'city is required';
    }
    if (!formData.zipCode?.trim()) {
      newErrors.zipCode = 'zip code is required';
    }
    if (!formData.state?.trim()) {
      newErrors.state = 'state is required';
    }

    setErrors(newErrors as typeof error);

    // If any errors exist, return early
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (isEditAddress) {
      disPatch(
        updateAddress({
          _id: addressId,
          contactDetails: {
            name: formData.name,
            email: formData.email,
          },
          addressDetails: {
            apartment: formData.apartment,
            street: formData.street,
            city: formData.city,
            zipCode: formData.zipCode,
            state: formData.state,
          },
          addressType: formData.addressType,
        })
      );
      setIsEditSuccessOpen(true);
    } else {
      if (setIsEditAddress) {
        setIsEditAddress(false);
        if (setConFirmAddress) {
          // setConFirmAddress(true);
          disPatch(
            addAddress({
              contactDetails: {
                name: formData.name,
                email: formData.email,
              },
              addressDetails: {
                apartment: formData.apartment,
                street: formData.street,
                city: formData.city,
                zipCode: formData.zipCode,
                state: formData.state,
              },
              addressType: formData.addressType,
            })
          );
        }
        Toast.show({
          type: 'success',
          text1: 'Address added successfully',
          position: 'top',
        });
      }
      // onSave(formData);
      onOpenChange(false);
    }

    setFormData({
      name: '',
      email: '',
      addressType: 'home',
      apartment: '',
      street: '',
      city: '',
      zipCode: '',
      state: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleZipCodeChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  useEffect(() => {
    if (addressDetails) {
      console.log('hey');
      setFormData((prev) => ({
        ...prev,

        city: addressDetails?.city,
        street: addressDetails?.street,
        state: addressDetails?.provincie,
      }));
    }
  }, [addressDetails]);

  const renderFormFields = () => {
    const fields = [];
    let i = 0;

    while (i < formFields.length) {
      const currentField = formFields[i];

      if (currentField.id === 'city') {
        fields.push(
          <XStack key="city-zip-row" gap="$3" width="100%">
            {['city', 'zipCode'].map((fieldId) => {
              const field = formFields.find((f) => f.id === fieldId);
              return (
                <Fieldset key={fieldId} flex={1}>
                  <Input
                    {...inputStyle}
                    id={fieldId}
                    value={formData[fieldId as keyof typeof formData] as string}
                    onChangeText={(text) => {
                      if (fieldId === 'zipCode') {
                        handleZipCodeChange(text, fieldId);
                      } else {
                        handleInputChange(fieldId, text);
                      }
                    }}
                    placeholder={field?.placeholder}
                    keyboardType="ascii-capable"
                  />
                  {error[fieldId as keyof typeof error] && (
                    <Text mt={4} color="red" fontSize={12}>
                      {error[fieldId as keyof typeof error]}
                    </Text>
                  )}
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
              value={formData[currentField.id as keyof typeof formData] as string}
              onChangeText={(text) => handleInputChange(currentField.id, text)}
              placeholder={currentField.placeholder}
              keyboardType={currentField.keyboardType}
            />
            {error[currentField.id as keyof typeof error] && (
              <Text mt={4} color="red" fontSize={12}>
                {error[currentField.id as keyof typeof error]}
              </Text>
            )}
          </Fieldset>
        );
      }

      i++;
    }

    return fields;
  };

  return (
    <>
      <Dialog modal open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            pointerEvents="none"
            animation="quick"
            opacity={0}
            backgroundColor="transparent"
            borderWidth={0}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          />
          <Dialog.Content
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            top={180}
            borderWidth={0}
            borderColor="transparent"
            outlineWidth={0}
            outlineColor="transparent"
            width="100%"
            borderTopLeftRadius="$4"
            borderTopRightRadius="$4"
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            borderBottomWidth={0}
            marginBottom={0}
            paddingBottom="$4"
            maxHeight="90%"
            elevation={0}
            shadowColor="transparent"
            animation="quick"
            enterStyle={{ y: 1000, opacity: 0 }}
            exitStyle={{ y: 1000, opacity: 0 }}
            y={0}
            opacity={1}
            key="content"
            backgroundColor="white"
            style={{
              borderWidth: 0,
              borderColor: 'transparent',
              boxShadow: 'none',
              shadowOpacity: 0,
            }}>
            <ScrollView flex={1} backgroundColor="white" showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <YStack flex={1} gap="$7">
                  <YStack gap={12}>
                    <Text fontSize={16} fontWeight="bold" color="#1E1F20">
                      Contact Details
                    </Text>

                    <Fieldset>
                      <Input
                        placeholder="Name"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        {...inputStyle}
                      />
                      {error.name && (
                        <Text mt={4} color="red" fontSize={12}>
                          Name field is required
                        </Text>
                      )}
                    </Fieldset>
                    <Fieldset>
                      <Input
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        {...inputStyle}
                      />
                      {error.email && (
                        <Text mt={4} color="red" fontSize={12}>
                          {error.email}
                        </Text>
                      )}
                    </Fieldset>
                  </YStack>

                  <YStack gap={12}>
                    <XStack flex={1} justifyContent="space-between">
                      <Text fontSize={16} fontWeight="bold" color="#1E1F20">
                        Address
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          // if (setIsShowMapModal) {
                          //   setIsShowMapModal(true);
                          // }
                          Toast.show({
                            type: 'error',
                            text1: 'Feature not available yet',
                          });
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Mark />
                        <Text color="#FD4F01" fontSize={14} fontWeight={700}>
                          Use Current Location
                        </Text>
                      </TouchableOpacity>
                    </XStack>
                    {renderFormFields()}
                  </YStack>

                  <YStack gap="$3">
                    <Text fontSize={16} fontWeight="bold" color="#1E1F20">
                      Address Type
                    </Text>
                    <RadioGroup
                      value={formData.addressType}
                      onValueChange={(value) => handleInputChange('addressType', value)}
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
                            {formData.addressType === type && (
                              <RadioGroup.Indicator
                                backgroundColor="#FD4F01"
                                width={10}
                                height={10}
                                borderRadius={5}
                              />
                            )}
                          </RadioGroup.Item>
                          <Label htmlFor={type} color={'#1E1F20'} fontSize={14} fontWeight={500}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Label>
                        </XStack>
                      ))}
                    </RadioGroup>
                  </YStack>
                  <XStack gap={10} mt={20} py={20} justifyContent="space-between" width="100%">
                    <Dialog.Close asChild>
                      <XStack flex={1}>
                        <Button
                          flex={1}
                          backgroundColor="white"
                          variant="outlined"
                          onPress={() => {
                            onOpenChange(false);
                            if (setIsEditAddress) {
                              setIsEditAddress(false);
                            }
                          }}
                          color="#FD4F01"
                          borderColor="#FD4F01"
                          borderRadius={8}
                          fontSize={16}
                          fontWeight={700}
                          borderWidth={1}
                          elevation={2}
                          shadowColor="rgba(10, 13, 18, 0.05)"
                          shadowOffset={{ width: 0, height: 1 }}
                          shadowOpacity={0.05}
                          shadowRadius={2}
                          pressStyle={{
                            elevation: 2,
                            shadowColor: 'rgba(10, 13, 18, 0.05)',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            backgroundColor: 'white',
                          }}>
                          Cancel
                        </Button>
                      </XStack>
                    </Dialog.Close>
                    <XStack flex={1} marginLeft={10}>
                      <Button
                        flex={1}
                        onPress={handleSubmit}
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
                  </XStack>
                </YStack>
              </TouchableWithoutFeedback>
            </ScrollView>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      {isEditSuccessOpen && (
        <EditSuccess
          open={isEditSuccessOpen}
          onOpenChange={setIsEditSuccessOpen}
          //@ts-ignore
          setIsAddressModalOpen={setIsAddressModalOpen}
          setConfirmAddress={setConFirmAddress}
          //@ts-ignore
          setIsEditAddress={setIsEditAddress}
          //@ts-ignore
          setConFirmAddress={setConFirmAddress}
        />
      )}
    </>
  );
}

function EditSuccess({
  open,

  onOpenChange,
  setIsEditAddress,
  setConFirmAddress,
  setIsAddressModalOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsEditAddress: (isEditAddress: boolean) => void;
  setConFirmAddress: (confirmAddress: boolean) => void;
  setIsAddressModalOpen: (addressModalOpen: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="quick"
              opacity={1}
              backgroundColor="rgba(0, 0, 0, 0.20)"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              bordered
              elevate
              key="content"
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
              onPointerDownOutside={() => onOpenChange(false)}
              onEscapeKeyDown={() => onOpenChange(false)}
              space
              p="0"
              borderRadius="$4"
              maxWidth={400}
              w={340}>
              <View
                p={'$5'}
                bg="white"
                borderRadius={12}
                elevationAndroid={1.5}
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowRadius={4}
                shadowOffset={{ width: 1, height: 2 }}>
                <Text textAlign="center" w="100%" color="#009A21" fontSize={24} fontWeight={700}>
                  Awesome!
                </Text>
                <TouchableOpacity
                  style={{ position: 'absolute', right: 20, top: 20 }}
                  onPress={() => {
                    setIsEditAddress(false);
                    setIsAddressModalOpen(false);
                    // setConFirmAddress(true);
                    // onOpenChange(false);
                    if (setIsEditAddress) {
                      setIsEditAddress(false);

                      // setConFirmAddress(false);
                    }
                  }}>
                  <AntDesign name="close" size={24} color="#1E1F20" />
                </TouchableOpacity>

                <Text mt={12} color="#1E1F20" fontWeight={500}>
                  You have successfully edited your address.
                </Text>
              </View>

              {/* Rest of your dialog content remains the same */}
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
