import { useEffect, useState } from 'react';
import { useGetAddressInfoMutation } from '../store/apiSlices/zipCodeAddressSlice';

export default function useGetAddressDetails(postcode: string) {
  const [getAddressInfo] = useGetAddressInfoMutation();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    function fetchAddressInfo() {
      getAddressInfo({
        postcode,
        website: 'fitpreps.nl',
      })
        .unwrap()
        .then((res) => {
          if (res.success) {
            setData(res.data);
          } else {
            setData(null);
          }
        })
        .catch((err) => {
          setData(null);
        });
    }
    fetchAddressInfo();
  }, [postcode]);
  return { data };
}
