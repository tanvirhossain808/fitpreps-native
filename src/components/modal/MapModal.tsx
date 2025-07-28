import { Button, Dialog, Input, Text, XStack, YStack, View, Image } from 'tamagui';
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
export function MapModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
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
          // elevation={0}
          // shadowColor="transparent"
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
          <YStack flex={1} justifyContent="space-between">
            <XStack
              width={'100%'}
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={1}
              shadowRadius={2}
              elevation={1}
              backgroundColor="white"
              borderColor="#EDEEF1"
              borderWidth={1}
              alignItems="center"
              gap="$2"
              px={14}
              justifyContent="space-between"
              borderRadius={8}>
              <Input
                flex={1}
                width="100%"
                py={10}
                px={0}
                backgroundColor="white"
                borderWidth={0}
                outlineWidth={0}
                placeholder="Search for a street or area"
                placeholderTextColor="#8E95A2"
                fontSize={14}
              />
              <Feather name="search" size={20} color="#181D27" />
            </XStack>
            <YStack>
              <Image
                src={require('public/images//Basemap image.png')}
                width={'100%'}
                height={300}
              />
            </YStack>
            <YStack py="$5" gap="$3">
              <Text fontSize={16} fontWeight={700} color="#1E1F20">
                ABC Apartments
              </Text>
              <Text mt="$1" color="#1E1F20" fontSize={14}>
                Street name, Block no., Locality, City Name, State - 000000.
              </Text>
              <Button
                onPress={() => onOpenChange(false)}
                color="white"
                fontSize={16}
                fontWeight={700}
                bg="#FD4F01"
                h={45}>
                Confirm
              </Button>
            </YStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

interface MapViewerProps {
  onLocationSelect?: (location: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  }) => void;
}

function MapViewer({ onLocationSelect }: MapViewerProps) {
  const [locationName, setLocationName] = useState('Tap on the map');
  const [region, setRegion] = useState<Region>({
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
    })();
  }, []);

  const handleMapPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    try {
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (address.length > 0) {
        const { street, city, region, postalCode, country } = address[0];
        const fullAddress =
          `${street || ''} ${city || ''} ${region || ''} ${postalCode || ''} ${country || ''}`.trim();
        setLocationName(fullAddress);

        if (onLocationSelect) {
          onLocationSelect({
            address: fullAddress,
            coordinates: { latitude, longitude },
          });
        }
      }

      setRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationName('Could not get address');
    }
  };

  return (
    <YStack flex={1} backgroundColor="white">
      <XStack
        width="100%"
        backgroundColor="white"
        borderColor="$gray3"
        borderBottomWidth={1}
        alignItems="center"
        px="$4"
        py="$3"
        gap="$3">
        <Input
          flex={1}
          py="$2"
          px="$3"
          backgroundColor="white"
          borderWidth={1}
          borderColor="$gray5"
          borderRadius="$2"
          placeholder="Search for a street or area"
          placeholderTextColor="$gray10"
          fontSize="$4"
        />
        <Feather name="search" size={20} color="#181D27" />
      </XStack>

      <View flex={1}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Selected Location"
          />
        </MapView>
      </View>

      <YStack p="$4" space="$3" borderTopWidth={1} borderTopColor="$gray3">
        <Text fontSize="$5" fontWeight="700" color="$gray1">
          {locationName}
        </Text>
        <Button
          onPress={() => {
            onLocationSelect?.({
              address: locationName,
              coordinates: region,
            });
          }}
          backgroundColor="$orange9"
          color="white"
          fontSize="$5"
          fontWeight="700"
          h={45}
          pressStyle={{ backgroundColor: '$orange10' }}>
          Confirm Location
        </Button>
      </YStack>
    </YStack>
  );
}
