import { useEffect, useState } from 'react';
import { Platform, Keyboard } from 'react-native';

const useKeyboardBehavior = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const getKeyboardBehavior = () => {
    if (Platform.OS === 'ios') {
      return 'padding';
    }
    return isKeyboardVisible ? 'height' : undefined;
  };

  return {
    isKeyboardVisible,
    keyboardBehavior: getKeyboardBehavior(),
  };
};

export default useKeyboardBehavior;
