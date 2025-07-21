import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();

  // Shared values for font size
  const fontSize = useSharedValue(30);
  const savedFontSize = useSharedValue(30);

  // Pinch gesture definition
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      fontSize.value = savedFontSize.value * event.scale;
    })
    .onEnd(() => {
      savedFontSize.value = fontSize.value;
    });

  // Animated style for the text
  const animatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
    };
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={styles.container}>
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing="back"></CameraView>
          </View>
          <AnimatedText style={[styles.text, animatedStyle]}>
            Pinch me!
          </AnimatedText>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: 300,
    height: 300,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 20,
    position: "absolute",
  },
  camera: {
    flex: 1,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});