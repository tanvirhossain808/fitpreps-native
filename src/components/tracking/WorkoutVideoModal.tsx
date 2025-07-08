import { SafeAreaView } from 'react-native-safe-area-context';
import { Dialog, Text, View, XStack, YStack } from 'tamagui';
import { VideoHeader } from '../drawer/DrawerPageHeader';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { videoSource } from '~/src/constant';
import { useCallback, useEffect, useRef, useState } from 'react';
import Play from 'public/images/play.svg';
import { useFocusEffect } from 'expo-router';

export function WorkoutVideoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.pause();
  });
  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      player.play();
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setIsPlaying(!isPlaying);
  };
  useFocusEffect(
    useCallback(() => {
      // This runs when the screen comes into focus
      if (open) {
        // player?.loadAsync?.();
        player.play();
        setIsPlaying(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      // This cleanup function runs when the screen goes out of focus
      return () => {
        if (player) {
          //   player.pause();
          // Reset the video to beginning
          //   player.;
        }
        setIsPlaying(false);
        // fadeAnim.setValue(1); // Reset animation
      };
    }, [open, player])
  );
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          pointerEvents="none"
          animation="quick"
          opacity={0}
          backgroundColor="transparent"
          borderWidth={0}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
        <Dialog.Content
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          borderWidth={0}
          borderColor="transparent"
          outlineWidth={0}
          outlineColor="transparent"
          width="100%"
          borderTopLeftRadius="$4"
          borderTopRightRadius="$4"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          borderBottomWidth={0}
          marginBottom={0}
          paddingBottom="$4"
          height="100%"
          elevation={0}
          shadowColor="transparent"
          animation="quick"
          enterStyle={{ y: 1000, opacity: 0 }}
          exitStyle={{ y: 1000, opacity: 0 }}
          y={0}
          opacity={1}
          key="content"
          backgroundColor="#1E1F20"
          style={{
            borderWidth: 0,
            borderColor: 'transparent',
            boxShadow: 'none',
            shadowOpacity: 0,
          }}>
          <YStack f={1}>
            <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
              <VideoHeader onPress={() => onOpenChange(false)} title="Exercise Name" />
              <YStack f={1}>
                <XStack px={16} py={40}>
                  <Text color="white" fontSize={15} fontWeight={500} textAlign="center">
                    Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor
                    incididunt.
                  </Text>
                </XStack>
                <XStack
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform={[{ translateX: '-50%' }, { translateY: '-50%' }]}>
                  <View f={1} style={styles.videoContainer}>
                    <VideoView
                      style={styles.video}
                      player={player}
                      allowsFullscreen
                      allowsPictureInPicture
                    />
                    <Animated.View
                      pointerEvents={isPlaying ? 'none' : 'auto'}
                      style={[
                        styles.playButton,
                        {
                          opacity: fadeAnim,
                          transform: [{ scale: fadeAnim }],
                        },
                      ]}>
                      <TouchableOpacity
                        onPress={togglePlayPause}
                        style={styles.touchableArea}
                        activeOpacity={0.8}>
                        {isPlaying ? <Play /> : <Play />}
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </XStack>
              </YStack>
            </SafeAreaView>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 336,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFEDE5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  touchableArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
