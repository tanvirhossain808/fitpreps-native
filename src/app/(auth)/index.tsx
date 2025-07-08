import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, YStack } from 'tamagui';
import Fitpreps from 'public/images/logo/fitpreps.svg';
import { router } from 'expo-router';

export default function index() {
  return (
    <YStack f={1}>
      <ImageBackground
        source={require('public/images/auth/login.png')}
        style={styles.container}
        resizeMode="cover">
        <SafeAreaView style={styles.loginIntro}>
          <YStack f={1} alignItems="center" gap="$7">
            <Fitpreps />
            <Text fontSize={16} fontWeight={500} color="#1E1F20" textAlign="center">
              Choose Fit Preps and support your fitness goals — without the hassle!
            </Text>
            <YStack gap="$3" width="100%">
              <Button
                onPress={() => router.push('/(auth)/sign-up')}
                fontSize={16}
                fontWeight={700}
                color="white"
                bg="#FD4F01"
                shadowColor="rgba(10, 13, 18, 0.05)"
                shadowOffset={{ width: 0, height: 1 }}
                shadowRadius={2}
                shadowOpacity={1}
                elevation={0}>
                Create Account
              </Button>
              <Button
                onPress={() => router.push('/(auth)/log-in')}
                fontSize={16}
                fontWeight={700}
                color="#FD4F01"
                bg="white"
                shadowColor="rgba(10, 13, 18, 0.05)"
                shadowOffset={{ width: 0, height: 1 }}
                shadowRadius={2}
                shadowOpacity={1}
                elevation={0}
                borderWidth={1}
                borderColor="#FD4F01">
                Log In
              </Button>
            </YStack>
          </YStack>
        </SafeAreaView>
      </ImageBackground>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  loginIntro: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
