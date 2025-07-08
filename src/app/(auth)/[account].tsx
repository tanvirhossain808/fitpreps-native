import { ScrollView } from 'tamagui';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '~/src/components/auth/AuthHeader';
import CreateAccount from '~/src/components/auth/CreateAccount';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Login from '~/src/components/auth/Login';
import ForgetPass from '~/src/components/auth/ForgetPass';

const authFlow = {
  'log-in': Login,
  'sign-up': CreateAccount,
  'forget-pass': ForgetPass,
} as const;
export default function Account() {
  const { account: loginStatus } = useLocalSearchParams();
  const [authStatus, setAuthStatus] = useState<null | string>(null);
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
  useEffect(() => {
    if (['log-in', 'sign-up', 'forget-pass', 'recover-password'].includes(loginStatus as string)) {
      setAuthStatus(loginStatus as string);
    }
  }, [loginStatus]);

  if (!authStatus) {
    return null;
  }
  const headerStatus =
    authStatus === 'sign-up'
      ? 'Create New Account'
      : authStatus === 'forget-pass'
        ? 'Forget Password'
        : authStatus === 'recover-password'
          ? 'Recover Password'
          : 'Log In';
  const AuthComponent = authFlow[authStatus as keyof typeof authFlow];
  const androidKeyboardBehavior = isKeyboardVisible ? 'height' : undefined;

  return (
    <ImageBackground
      source={require('public/images/auth/login.png')}
      style={styles.container}
      resizeMode="cover">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : androidKeyboardBehavior}>
        <AuthHeader title={headerStatus} />
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.loginIntro}>
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            {authStatus === 'recover-password' ? (
              <ForgetPass account={authStatus} />
            ) : (
              <AuthComponent account={authStatus} />
            )}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginIntro: {
    flex: 1,
  },
});
