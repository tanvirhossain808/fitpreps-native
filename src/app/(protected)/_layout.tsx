import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthGuard from '~/src/components/auth/AuthGuard';
import { baseUrl } from '~/src/constants/baseConstant';
import { RootState } from '~/src/store';
import { useGetProductsQuery } from '~/src/store/apiSlices/products/productsSlice';
import { useGetSmakelijkeProductsQuery } from '~/src/store/apiSlices/products/smakelijke';
import { useGetSupplementsQuery } from '~/src/store/apiSlices/products/supplementsSlice';
import { setSubscription } from '~/src/store/auth/userSlice';

export default function ProtectedLayout() {
  const { data: cookd } = useGetSmakelijkeProductsQuery(null);
  const { data: fueld } = useGetProductsQuery(null);
  const { data: suppd } = useGetSupplementsQuery(null);
  const  user  = useSelector((state:RootState)=>state.user.user?.user);
const dispatch=useDispatch()
  const fetchSubscription = async () => {
    if (user?._id) {
        try {
            const response = await fetch(`${baseUrl}/api/subscription/user/${user._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
               
                return;
            }
            const subscriptionData = await response.json();

            dispatch(setSubscription(subscriptionData.subscription))
        } catch (error) {
            return
        }
      
    }
}



useEffect(() => {
   fetchSubscription()
},[user])

  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthGuard>
  );
}
