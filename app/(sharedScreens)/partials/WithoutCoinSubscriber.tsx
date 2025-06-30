import { Feather } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Text, View, YStack } from 'tamagui';
import VideoRecorder from 'public/images/video-recorder.svg';
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function WithoutCoinSubscriber() {
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

  return (
    <YStack py="$10">
      <YStack py="$5" px="$3" gap="$5" bg="rgba(255, 255, 255, 0.85)" borderRadius={20}>
        <YStack gap="$3">
          <Text textAlign="center" color="#1E1F20" fontSize={16} fontWeight={700}>
            Before we start!
          </Text>
          <Text color="black" fontSize={14} fontWeight={500}>
            With your subscription, you&apos;re actually buying points—not meals directly. These
            points let you choose the meals you want, when you want them. Watch the video below to
            see how it works.
          </Text>
        </YStack>
        <View style={styles.videoContainer}>
          <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
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
              {isPlaying ? (
                <Feather name="pause" size={24} color="white" />
              ) : (
                <VideoRecorder width={24} height={24} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </YStack>
    </YStack>
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
    height: 185,
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
    backgroundColor: '#FF7435',
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
