import {
  View,
  Text,
  YStack,
  ScrollView,
  XStack,
  Image,
  Fieldset,
  Input,
  Label,
  Button,
} from 'tamagui';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import DrawerPageHeader from '~/src/components/drawer/DrawerPageHeader';
import * as ImagePicker from 'expo-image-picker';
import CartDatePicker from '~/src/components/shared/cart/CartDatePicker';
import SelectDate from '~/src/components/shared/SelectDate';

export default function MyProfile() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Sorry, we need camera roll permissions to make this work!'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while picking the image');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <YStack flex={1}>
        <ScrollView bg="white">
          <SafeAreaView>
            <DrawerPageHeader title="My Profile" />
            <YStack py="$7" px="$4" gap={32}>
              <TouchableOpacity onPress={pickImage}>
                <XStack justifyContent="center">
                  {image ? (
                    <Image width={100} height={100} borderRadius={50} source={{ uri: image }} />
                  ) : (
                    <Image
                      width={100}
                      height={100}
                      borderRadius={50}
                      source={require('public/images/drawer/avatar.png')}
                    />
                  )}
                </XStack>
              </TouchableOpacity>
              <YStack gap="$5">
                {fieldInfo.map(({ placeHolder, label, value, id }) => (
                  <ProfileFields placeHolder={placeHolder} key={id} label={label} value={value} />
                ))}
                <SelectDate title="Date Of Birth" />
              </YStack>
            </YStack>
          </SafeAreaView>
        </ScrollView>
      </YStack>
    </KeyboardAvoidingView>
  );
}

function ProfileFields({
  label,
  value,
  placeHolder,
}: {
  label: string;
  value: string;
  placeHolder: string;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const handleChange = () => {
    setIsEdit(() => false);
  };
  const handleCancel = () => {
    setIsEdit(() => false);
    setCurrentValue(() => value);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <YStack gap={20} flex={1}>
        <Fieldset flex={1} display="flex" gap={0} m={0} p={0}>
          <Label h={40} m={0} color="#8E95A2" fontWeight={500} fontSize={12}>
            {label}
          </Label>
          <XStack
            borderWidth={1}
            borderRadius={8}
            bg="white"
            borderColor={isEdit ? '#FFEDE5' : '#EDEEF1'}
            alignItems="center"
            flex={1}
            px={14}
            py={10}
            shadowColor="rgba(10, 13, 18, 0.05)"
            shadowOpacity={1}
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={2}
            elevation="$1">
            <Input
              onChangeText={setCurrentValue}
              minHeight={0}
              value={currentValue}
              height="$2"
              color="#1E1F20"
              editable={isEdit ? true : false}
              fontSize={14}
              px={0}
              py={0}
              flex={1}
              placeholder={placeHolder}
              bg="$backgroundTransparent"
              borderWidth={0}
              outlineWidth={0}
            />
            <TouchableOpacity onPress={() => setIsEdit(true)}>
              <Text
                color="#FD4F01"
                fontSize={16}
                fontWeight={700}
                borderBottomWidth={2}
                borderColor="#FD4F01">
                Edit
              </Text>
            </TouchableOpacity>
          </XStack>
        </Fieldset>
        {isEdit && (
          <XStack flex={1} gap="$3">
            <Button
              onPress={handleChange}
              flex={1}
              color="white"
              fontWeight={700}
              bg="#FF7435"
              py={10}
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOpacity={1}
              shadowOffset={{ width: 0, height: 1 }}
              shadowRadius={2}
              elevation="$1">
              Save Changes
            </Button>
            <Button
              onPress={handleCancel}
              py={10}
              borderWidth={1}
              borderColor="#FD4F01"
              bg="white"
              color="#FD4F01"
              flex={1}
              shadowColor="rgba(10, 13, 18, 0.05)"
              shadowOpacity={1}
              shadowOffset={{ width: 0, height: 1 }}
              shadowRadius={2}
              elevation="$1">
              Cancel
            </Button>
          </XStack>
        )}
      </YStack>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  hiddenOpacity: {
    opacity: 0,
  },
});

const fieldInfo = [
  {
    label: 'Name',
    placeHolder: 'User Name',
    id: 1,
    type: 'default',
    value: 'User Name',
  },
  {
    label: 'Email',
    placeHolder: 'username@gmail.com',
    id: 2,
    type: 'email',
    value: 'username@gmail.com',
  },
  {
    label: 'Email',
    placeHolder: 'username@gmail.com',
    id: 3,
    type: 'email',
    value: 'username@gmail.com',
  },
];
