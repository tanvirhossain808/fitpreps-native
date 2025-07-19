import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Text, TextProps, XStack } from 'tamagui';
import { RootState } from '~/src/store';
import { DrawerNavigation } from '~/src/types/navigation';
import { setSearch as setSearchAction } from '~/src/store/slices/filterSlice';

export default function TopSearchbar({
  placeholder,
  showBackButton = true,
  isTrackingScreen = false,
  action = false as any,
  textProps = {},
}: {
  placeholder: string;
  showBackButton?: boolean;
  isTrackingScreen?: boolean;
  action?: () => void | boolean;
  textProps?: TextProps;
}) {
  const navigation = useNavigation<DrawerNavigation>();
  const handleBack = () => {
    if (action) {
      action();
    } else {
      router.back();
    }
  };

  const cartQuantity = useSelector((s: RootState) => s.cart.quantity);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    dispatch(setSearchAction(search));
  };
  useEffect(() => {
    if (!search) dispatch(setSearchAction(''));
  }, [search]);
  return (
    <XStack p="$4" justifyContent="space-between" gap="$3" flexWrap="wrap" width="100%">
      <XStack flex={1} alignItems="center" gap="1">
        {showBackButton && (
          <TouchableOpacity onPress={handleBack}>
            <Entypo name="chevron-left" size={24} color={!isTrackingScreen ? 'black' : 'white'} />
          </TouchableOpacity>
        )}

        {!isTrackingScreen ? (
          <XStack
            bg="white"
            alignItems="center"
            pr={14}
            flex={1}
            minWidth={200}
            borderRadius={8}
            elevation={1}
            justifyContent="space-between"
            shadowColor="#0000000D"
            shadowOffset={{ width: 0, height: 0.2 }}
            shadowOpacity={0.05}
            shadowRadius={1}>
            <Input
              placeholder={placeholder}
              fontSize={12}
              flex={1}
              value={search}
              onChangeText={setSearch}
              focusStyle={{
                borderColor: 'transparent',
                outlineWidth: 0,
                shadowColor: 'transparent',
              }}
              minWidth={100}
              bg="transparent"
              borderColor="$colorTransparent"
            />
            <TouchableOpacity onPress={handleSearch}>
              <Octicons name="search" size={20} color="black" />
            </TouchableOpacity>
          </XStack>
        ) : (
          <Text
            color="white"
            fontSize={20}
            fontWeight={700}
            w={190}
            textAlign="center"
            {...textProps}>
            {placeholder}
          </Text>
        )}
      </XStack>

      <XStack alignItems="center" gap="$2">
        <XStack
          w={40}
          h={40}
          alignItems="center"
          justifyContent="center"
          borderRadius={50}
          bg="#ffede5">
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Feather name="shopping-cart" size={18} color="#FD4F01" />
          </TouchableOpacity>
          <XStack
            alignItems="center"
            justifyContent="center"
            w={cartQuantity > 99 ? 20 : 16}
            h={cartQuantity > 99 ? 20 : 16}
            position="absolute"
            right={0}
            top={0}
            borderRadius={50}
            bg="#FD4F01">
            <Text fontSize={10} color="white">
              {cartQuantity ? cartQuantity : 0}
            </Text>
          </XStack>
        </XStack>

        <XStack
          w={40}
          h={40}
          alignItems="center"
          justifyContent="center"
          elevation={1}
          borderRadius={50}
          bg="#ffffff"
          shadowColor="#0000000D"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={4}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Feather name="menu" size={18} color="#25272C" />
          </TouchableOpacity>
        </XStack>
      </XStack>
    </XStack>
  );
}
