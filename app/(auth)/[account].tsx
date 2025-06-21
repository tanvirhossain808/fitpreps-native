import { ScrollView } from 'tamagui';
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '~/components/auth/AuthHeader';
import CreateAccount from '~/components/auth/CreateAccount';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Login from '~/components/auth/Login';
import ForgetPass from '~/components/auth/ForgetPass';

const authFlow = {
  'log-in': Login,
  'sign-up': CreateAccount,
  'forget-pass': ForgetPass,
} as const;
export default function Account() {
  const { account: loginStatus } = useLocalSearchParams();
  const [authStatus, setAuthStatus] = useState<null | string>(null);

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

  return (
    <ImageBackground
      source={require('../../public/images/auth/login.png')}
      style={styles.container}
      resizeMode="cover">
      <AuthHeader title={headerStatus} />
      <SafeAreaView style={styles.loginIntro}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          {authStatus === 'recover-password' ? (
            <ForgetPass account={authStatus} />
          ) : (
            <AuthComponent account={authStatus} />
          )}
        </ScrollView>
      </SafeAreaView>
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
