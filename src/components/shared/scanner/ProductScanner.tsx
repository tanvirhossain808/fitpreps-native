import Toast from 'react-native-toast-message';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Button, Dialog, View } from 'tamagui';
import Feather from '@expo/vector-icons/Feather';
import Juice from 'public/images/Magere Runder Burger - Zoete Aardappel - Broccoli.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
export default function ProductScanner({
  open,
  setOpen,
  showFoodCalToast,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showFoodCalToast: () => void;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>No access to camera</Text>
        <Button onPress={requestPermission}>Request Permission</Button>
      </YStack>
    );
  }
  const handleAdd = () => {
    setOpen(false);
    setTimeout(showFoodCalToast, 100);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="bouncy"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          width="100%"
          height="100%"
          animation="bouncy"
          padding={0}
          space="$4"
          backgroundColor="#EDE1D1">
          <SafeAreaView style={{ ...styles.container }}>
            <XStack w="100%" px="$7" py="$5" justifyContent="space-between" alignItems="center">
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Feather name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <Text f={1} fontSize={20} fontWeight={700} w="100%" textAlign="center">
                Scan
              </Text>
              <XStack opacity={0}>
                <TouchableOpacity>
                  <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
              </XStack>
            </XStack>
            <YStack flex={1} alignItems="center" justifyContent="center">
              {/* Scanner Frame */}
              <View style={styles.scannerFrame}>
                {/* White corner brackets */}
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />

                {/* Bottle image inside scanner */}
                <CameraView ref={cameraRef} style={styles.bottleImage} facing={facing} />
              </View>

              {/* Add Button Section */}
              <XStack
                position="absolute"
                bottom={40}
                backgroundColor="white"
                padding="$3"
                borderRadius={12}
                alignItems="center"
                gap="$2"
                borderBottomWidth={1}
                borderBottomColor="#EDEEF1"
                // justifyContent="space-between"
                width={width * 0.9}
                // shadowColor="#000"
                // shadowOffset={{ width: 0, height: 2 }}
                // shadowOpacity={0.1}
                // shadowRadius={8}
                // elevation={5}
              >
                <Juice />
                <YStack>
                  <Text fontWeight={700} fontSize={14}>
                    ORANGE JUICE
                  </Text>
                  <Text fontSize={12} color="#1E1F20">
                    475 Kcal | 1L
                  </Text>
                </YStack>
                <Button
                  position="absolute"
                  right={12}
                  paddingHorizontal={14}
                  paddingVertical={8}
                  borderRadius={8}
                  fontSize={14}
                  fontWeight={700}
                  backgroundColor="#FD4F01"
                  color="white"
                  onPress={handleAdd}>
                  Add
                </Button>
              </XStack>
            </YStack>
          </SafeAreaView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const cornerStyle = {
  position: 'absolute' as const,
  width: 30,
  height: 30,
  borderColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scannerFrame: {
    width: 280,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bottleImage: {
    width: 200,
    height: 320,
    borderRadius: 20,
  },
  cornerTopLeft: {
    ...cornerStyle,
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    ...cornerStyle,
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    ...cornerStyle,
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    ...cornerStyle,
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
});
