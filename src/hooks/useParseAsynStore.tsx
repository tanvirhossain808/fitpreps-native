import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useParseStore = (whiteList: string) => {
  const [parseData, setParseData] = useState<any>(null);
  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const raw = await AsyncStorage.getItem('persist:root');
        if (!raw) return;

        const persistedRoot = JSON.parse(raw);
        if (persistedRoot)
          if (persistedRoot[whiteList]) {
            const parseData = JSON.parse(persistedRoot[whiteList]);
            setParseData(parseData);
          }
      } catch (err) {
        setParseData("can't get data");
        console.warn('Failed to load cart from storage', err);
      }
    };

    loadCartFromStorage();
  }, []);
  return { parseData };
};
export default useParseStore;
