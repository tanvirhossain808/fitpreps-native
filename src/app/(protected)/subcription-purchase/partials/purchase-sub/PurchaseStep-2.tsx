import {
  View,
  Text,
  Button,
  YStack,
  XStack,
  Popover,
  Dialog,
  AnimatePresence,
  ScrollView,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { address } from '~/src/constant';
import { TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MapModal } from '~/src/components/modal/MapModal';
import PopoverContent from '~/src/components/addresses/PopoverContent';
import { CartAddress } from '~/src/components/shared/cart/CartAddress';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { AddressType, SubPlan } from '~/src/types/type';
import { useSubPurchaseMutation } from '~/src/store/apiSlices/subPurchaseSlice';
import { WebView } from 'react-native-webview';
import { removeAddress } from '~/src/store/slices/addressSlice';
export default function PurchaseStep2({
  setCurrentStep,
  isEditAddress,
  setIsEditAddress,
  isShowMapModal,
  setShowMapModal,
  setIsAddressModalOpen,
  isAddressModalOpen,
  selectedIndex,
  setSelectedIndex,
  selectedSubPlan,
  setSelectedSubPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isEditAddress: boolean;
  selectedIndex: string | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditAddress: React.Dispatch<React.SetStateAction<boolean>>;
  isShowMapModal: boolean;
  setShowMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressModalOpen: boolean;
  selectedSubPlan: any;
  setSelectedSubPlan: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  const [confirmAddress, setConFirmAddress] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectAddressId, setSelectAddressId] = useState<string | null>(null);
  const [selectedDeleteAddressId, setSelectedDeleteAddressId] = useState<string | null>(null);
  const handleDelete = (addressId: string) => {
    setSelectedAddress(null);
    if (selectedIndex === addressId) {
      setSelectedIndex(null);
    }
    setSelectedDeleteAddressId(addressId);
    setIsDeleteDialogOpen(true);
    setSelectAddressId(addressId);
  };
  useEffect(() => {
    if (selectedIndex) {
      setSelectedIndex(null);
    }
  }, []);
  const handleEdit = (addressId: string) => {
    setSelectedAddress(() => null);
    setSelectAddressId(addressId);
    setIsAddressModalOpen(() => true);
    setIsEditAddress(() => true);
    // Add your edit logic here
  };
  const addressLists = useSelector((s: RootState) => s.address);
  console.log(selectedIndex, 'selectedIndex');
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {confirmAddress ? (
          <ConfirmAddress
            selectedSubPlan={selectedSubPlan}
            setSelectedSubPlan={setSelectedSubPlan}
            setConFirmAddress={setConFirmAddress}
            setCurrentStep={setCurrentStep}
            address={addressLists.find((item) => item?._id === selectedIndex) || null}
          />
        ) : (
          <YStack flex={1} justifyContent="space-between">
            <ScrollView>
              <YStack flex={1} px={'$4'} gap="$7">
                <Button
                  onPress={() => {
                    setSelectAddressId(null);
                    setIsEditAddress(false);
                    setIsAddressModalOpen(true);
                  }}
                  // onPress={() => router.('/new-address')}
                  width="100%"
                  fontSize={16}
                  color="#FD4F01"
                  fontWeight={700}
                  borderRadius={8}
                  borderWidth={1}
                  borderColor="#FD4F01"
                  backgroundColor="white"
                  // shadowColor="rgba(10, 13, 18, 0.05)"
                  // shadowOffset={{ width: 0, height: 1 }}
                  // shadowRadius={2}
                  // shadowOpacity={1}
                  // elevation={2}
                >
                  Add New Address
                </Button>
                {addressLists?.length === 0 ? (
                  <YStack gap="$3">
                    <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                      No Address Found,Please add new
                    </Text>
                  </YStack>
                ) : (
                  <YStack gap="$3">
                    <Text color="#1E1F20" fontSize={16} fontWeight={700}>
                      Saved Address
                    </Text>

                    {addressLists?.map((addressDetails: any, i: number) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => setSelectedIndex(addressDetails._id)}
                        activeOpacity={0.4}>
                        <XStack
                          p="$3"
                          gap="$3"
                          borderRadius={12}
                          bg="#FFF9F7"
                          alignItems="flex-start">
                          <XStack
                            mt="8"
                            alignItems="center"
                            justifyContent="center"
                            width={14}
                            height={14}
                            borderRadius={50}
                            borderWidth={1}
                            borderColor="#FD4F01">
                            <View
                              backgroundColor={
                                selectedIndex === addressDetails?._id ? '#FD4F01' : 'transparent'
                              }
                              width={10}
                              height={10}
                              borderRadius={selectedIndex === addressDetails?._id ? 50 : 0}
                            />
                          </XStack>
                          <YStack flex={1} alignSelf="stretch">
                            <XStack justifyContent="space-between" alignItems="flex-start">
                              <XStack gap={4} alignItems="center" flex={1} mr="$2">
                                <Text
                                  color="#1E1F20"
                                  fontSize={16}
                                  fontWeight={700}
                                  numberOfLines={1}>
                                  {addressDetails?.contactDetails?.name}
                                </Text>
                                <Text
                                  color="#009A21"
                                  fontSize={10}
                                  fontWeight={700}
                                  p="$2"
                                  bg="#E5F8EA"
                                  borderRadius={20}>
                                  {addressDetails?.addressType}
                                </Text>
                              </XStack>
                              <Popover
                                open={selectedAddress === i}
                                onOpenChange={() => {
                                  setSelectedAddress(selectedAddress === i ? null : i);
                                }}
                                placement="left-start"
                                offset={{ mainAxis: 100, crossAxis: 20 }}>
                                <Popover.Trigger asChild>
                                  <TouchableOpacity
                                    onPress={(e) => {
                                      e.stopPropagation();
                                      setSelectedAddress(selectedAddress === i ? null : i);
                                    }}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <Entypo
                                      name="dots-three-horizontal"
                                      size={24}
                                      color="#FD4F01"
                                    />
                                  </TouchableOpacity>
                                </Popover.Trigger>
                                <PopoverContent
                                  setPressedItem={setPressedItem}
                                  handleEdit={() => handleEdit(addressDetails._id)}
                                  handleDelete={() => handleDelete(addressDetails._id)}
                                  index={i}
                                />
                              </Popover>
                            </XStack>
                            <Text fontSize={14} marginTop={4}>
                              {addressDetails?.addressDetails?.street}
                            </Text>
                          </YStack>
                        </XStack>
                      </TouchableOpacity>
                    ))}
                  </YStack>
                )}
              </YStack>
            </ScrollView>
            <XStack alignItems="center" px={'$4'} pb="$5">
              <Button
                flex={1}
                mt="$3"
                bg="#FD4F01"
                borderRadius={8}
                fontSize={16}
                fontWeight={700}
                color="white"
                onPress={() => {
                  if (selectedIndex === null) {
                    Toast.show({
                      type: 'error',
                      text1: 'Error',
                      text2: 'Please select an address',
                      visibilityTime: 2000,
                    });
                    return;
                  }
                  // setCurrentStep(2);
                  setConFirmAddress(true);
                }}>
                Confirm
              </Button>
            </XStack>
          </YStack>
        )}
      </SafeAreaView>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        selectedAddress={selectedDeleteAddressId as string}
        onOpenChange={() => {}}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
      {isAddressModalOpen && (
        <CartAddress
          addressId={selectAddressId as string}
          setConFirmAddress={setConFirmAddress}
          isEditAddress={isEditAddress}
          setIsEditAddress={setIsEditAddress}
          open={isAddressModalOpen}
          onOpenChange={setIsAddressModalOpen}
          setIsAddressModalOpen={setIsAddressModalOpen}
          onSave={(address) => {
            setIsEditAddress(false);
            setIsAddressModalOpen(false);
          }}
          isShowMapModal={isShowMapModal}
          setIsShowMapModal={setShowMapModal}
        />
      )}
      <MapModal open={isShowMapModal} onOpenChange={() => setShowMapModal(false)} />
    </>
  );
}

function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  selectedAddress,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  selectedAddress: string;
}) {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    if (selectedAddress) {
      dispatch(removeAddress(selectedAddress));
      onConfirm();
    }
  };
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
              {/* Rest of your dialog content remains the same */}
              <YStack p="$5" gap="$5">
                <XStack justifyContent="space-between" alignItems="center" mb="$4">
                  <Text fontSize={20} fontWeight="700">
                    Remove Address?
                  </Text>
                  <Button
                    circular
                    icon={<AntDesign name="close" size={24} color="#1E1F20" />}
                    onPress={() => onOpenChange(false)}
                    unstyled
                  />
                </XStack>

                <YStack>
                  <Text fontSize={16} fontWeight="500" color="#1E1F20">
                    Once you remove this address it will not show during checkout.
                  </Text>
                </YStack>

                <XStack gap="$3" justifyContent="space-between">
                  <Button
                    flex={1}
                    alignSelf="stretch"
                    onPress={onCancel}
                    borderWidth={1}
                    borderColor="#FD4F01"
                    color="#FD4F01"
                    backgroundColor="transparent"
                    fontSize={16}
                    fontWeight="700"
                    px="$4"
                    py="$2">
                    Cancel
                  </Button>
                  <Button
                    onPress={handleConfirm}
                    backgroundColor="#FD4F01"
                    color="white"
                    fontSize={16}
                    fontWeight="600"
                    hoverStyle={{ backgroundColor: '#DC2626' }}>
                    Yes, Remove
                  </Button>
                </XStack>
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

const ConfirmAddress = ({
  setCurrentStep,
  address,
  setConFirmAddress,
  selectedSubPlan,
  setSelectedSubPlan,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  address: AddressType | null;
  setConFirmAddress: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSubPlan: SubPlan;
  setSelectedSubPlan: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [purchaseSubMutation] = useSubPurchaseMutation();
  const token = useSelector((s: RootState) => s.user?.user?.token) || '';
  const userId = useSelector((s: RootState) => s.user?.user?.user._id) || '';
  const date = useSelector((s: RootState) => s.subPurchase.startDate);
  const selectedDAte = useSelector((s: RootState) => s.subPurchase.startDate);
  const handleConfirmAddress = () => {
    purchaseSubMutation({
      body: {
        startDate:
          selectedSubPlan.planType.toLowerCase() === 'monthly'
            ? new Date().toISOString().split('T')[0]
            : date,
        userId,
        totalPoints: selectedSubPlan.coins + selectedSubPlan.bonusCoins,
        frequency: selectedSubPlan.planType.toLowerCase(),
        amount: selectedSubPlan.price.toFixed(2),
        type: 'fueld',
        data: {
          _billing_email: address?.contactDetails.email,
          _billing_first_name: address?.contactDetails.name,

          // _billing_last_name: address?.contactDetails.lastName,
          _billing_country: 'NL',
          _billing_address_1: address?.addressDetails.street,
          // _billing_address_2: 'Apt 4B',
          _billing_city: address?.addressDetails.city,
          _billing_state: address?.addressDetails.state,
          _billing_postcode: address?.addressDetails.zipCode,
          _billing_phone: address?.contactDetails.phone,
          // _billing_company: 'Doe Inc.',
          // _billing_company_kvk: '12345678',
          // _billing_company_vat: 'NL123456789B01',
          _shipping_email: address?.contactDetails.email,
          _shipping_first_name: address?.contactDetails.name,
          // _shipping_last_name: 'Doe',
          _shipping_country: 'NL',
          _shipping_address_1: address?.addressDetails.street,
          // _shipping_address_2: 'Apt 4B',
          _shipping_city: address?.addressDetails.city,
          _shipping_state: address?.addressDetails.state,
          _shipping_postcode: address?.addressDetails.zipCode,
          _shipping_phone: address?.contactDetails.phone,
          // _shipping_company: 'Doe Inc.',
          // _shipping_company_kvk: '12345678',
          // _shipping_company_vat: 'NL123456789B01',
          // _delivery_time: '17:00-18:00',
          _newsletter: false,
        },
      },
      token,
    })
      .unwrap()
      .then((res) => {
        if (res.success) {
          // router.push(res.checkoutUrl);
          router.push({
            pathname: '/verifyPayment/verifyPayment',
            params: {
              redirectUrl: res.checkoutUrl,
            },
          });
          // setRedirectUrl(res.checkoutUrl);
        }
      })
      .catch((err) => {
        console.log(err, 'err');
        Toast.show({
          type: 'error',
          text1: err?.data?.message || 'Something went wrong',
          position: 'top',
        });
      });
  };
  return (
    <>
      <YStack px="$4" flex={1} justifyContent="space-between">
        <YStack>
          <Text color="#1E1F20" fontWeight={700} fontSize={16}>
            Deliver to:
          </Text>
          <XStack alignItems="center" gap={4}>
            <Text color="#1E1F20" fontWeight={700} fontSize={16} mt="$3">
              {address?.addressDetails.apartment}
            </Text>
            <View mt={6} bg="#E5F8EA" borderRadius={20} p="$2">
              <Text color="#009A21" fontSize={10} fontWeight={700}>
                {address?.addressType}
              </Text>
            </View>
          </XStack>
          <Text color="#1E1F20" fontSize={16} mt={6}>
            {address?.addressDetails.street}, {address?.addressDetails.apartment},
            {address?.addressDetails.city}, {address?.addressDetails.state} -{' '}
            {address?.addressDetails.zipCode}
          </Text>
          <TouchableOpacity
            style={{ marginTop: 8, display: 'flex', alignItems: 'flex-start' }}
            onPress={() => setConFirmAddress(false)}>
            <Text
              color="#FD4F01"
              borderBottomWidth={2}
              fontSize={16}
              fontWeight={700}
              borderColor="#FD4F01">
              Change
            </Text>
          </TouchableOpacity>
        </YStack>
        <YStack py="$5">
          <YStack pb="$5">
            <Text color="#1E1F20" fontSize={16} fontWeight={700}>
              NOTE:
            </Text>

            <Text mt="$2" fontSize={16} fontWeight={500}>
              Your subscription will start on{' '}
              <Text color="#FD4F01">
                {selectedDAte ? selectedDAte : new Date().toISOString().split('T')[0]}
              </Text>
            </Text>
          </YStack>
          <Button
            onPress={handleConfirmAddress}
            mt="$5"
            borderRadius={12}
            color="white"
            fontWeight={700}
            fontSize={16}
            backgroundColor="#FD4F01">
            Continue
          </Button>
        </YStack>
      </YStack>
    </>
  );
};
