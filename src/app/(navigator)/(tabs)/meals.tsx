import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';
import { statusBarColor } from '~/src/constant';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import ProductHeader from '~/src/components/shared/ProductHeader';
import { lazy, Suspense, useEffect } from 'react';
import { activeStatsBarInfo } from '~/src/helper';
import LoadingSpinner from '~/src/components/shared/Loading';
import { useLoginMutation, useRegisterMutation } from '~/src/store/apiSlices/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/src/store';
import { setUser } from '~/src/store/auth/userSlice';
const ProductLists = lazy(() => import('~/src/components/shared/ProductLists'));
// export const unstable_settings = {
//   lazy: true,
// };
export default function Home() {
  const insets = useSafeAreaInsets();
  const { product = 'cookd' } = useLocalSearchParams();
  const statusBarInfo = activeStatsBarInfo(product as string);
  useFocusEffect(() => {
    setStatusBarStyle('light', true);
  });
  // const [register, { data, isLoading, error }] = useRegisterMutation();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  console.log(data, 'data');
  console.log(user, 'hey user');
  // useEffect(() => {
  //   async function registerUser() {
  //     const { data, error } = await login({
  //       email: 't@t.com',
  //       password: 'password',
  //     });
  //     console.log(data, 'yo data');
  //     if (data) {
  //       dispatch(setUser(data));
  //     }
  //   }
  //   registerUser();
  // }, [login]);
  return (
    <>
      <StatusBar style="light" />

      <View style={{ flex: 1 }}>
        <ProductHeader
          productType={product as string}
          activeStatsBarInfo={statusBarInfo as { name: string; color: string } | null}
          insets={insets}
        />

        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }} zIndex={0}>
            <Suspense
              fallback={
                <LoadingSpinner color={statusBarColor[product as keyof typeof statusBarColor]} />
              }>
              <ProductLists
                productType={product as string}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                // products={
                //   product === 'cookd'
                //     ? (foodOfItems as (FoodOfItem | SliderItem | fueld)[])
                //     : (fueldFoodOfItems as (FoodOfItem | SliderItem | fueld)[])
                // }
              />
            </Suspense>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sortDropdownContainer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  sortBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
  },
});
