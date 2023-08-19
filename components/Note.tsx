import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { INoteProps } from "../Interfaces";
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";

// const AnimatedView = Animated.createAnimatedComponent(View);

export default function (props: INoteProps) {
  //   const translateX = useSharedValue(0);

  //   const onDrag = useAnimatedGestureHandler({
  //     onStart: (event, context) => {
  //       //@ts-ignore
  //       context.translateX = translateX.value;
  //     },
  //     onActive: (event, context) => {
  //       //@ts-ignore
  //       translateX.value = event.translationX + context.translateX;
  //     },
  //   });

  //   const containerStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           translateX: translateX.value,
  //         },
  //       ],
  //     };
  //   });

  return (
    // <PanGestureHandler onGestureEvent={onDrag}>
    //   <AnimatedView style={styles.container}>
    <Pressable onPress={() => props.pressed(props.note)}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.note.title}</Text>
        <Text>{props.note.note}</Text>
      </View>
    </Pressable>
    //   </AnimatedView>
    // </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    height: 150,
    width: 400,
    backgroundColor: "#F9F9F9",
    borderColor: "whitesmoke",
    borderWidth: 10,
    borderRadius: 20,
  },
  title: {
    color: "black",
    fontSize: 25,
    fontWeight: "300",
    textAlign: "center",
  },
});
