import React, { useState } from 'react'
import { View, Text, Pressable, Animated, Easing } from 'react-native'
import IColors from '../../Models/IColors'
import { StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { ParamListBase } from '@react-navigation/native'
import { ComponentType } from 'react'
// import {useRandomColorHook} from '../../hooks/useRandomColorHook'
import useRandomColorHook from '../../hooks/useRandomColorHook'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { Dimensions } from 'react-native/Libraries/Utilities/Dimensions'
import { Dimensions } from 'react-native'
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { color } from 'react-native-reanimated'
import checkContrast from '../../hooks/useContrastColor'

export default () => {
  //set the color on the text to make it dynamic zie lijn 17
  const [backgroundColor, setbackgroundColor] = useState<IColors>({
    name: 'indianred',
    hex: '#CD5C5C',
    rgb: 'rgb(205, 92, 92)',
  })
  const [circleColor, setCircleColor] = useState<IColors>()
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100,
  })

  const [scale] = useState<Animated.Value>(new Animated.Value(0))
  const [fade] = useState<Animated.Value>(new Animated.Value(0))
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>()
  const { getRandomColor } = useRandomColorHook()

  const circleSize = Math.pow(
    Dimensions.get('window').width + Dimensions.get('window').width,
    2,
  )

  const [textColor, setTextColor] = useState(checkContrast(backgroundColor.rgb))

  const handleNewColor = (event: GestureResponderEvent) => {
    impactAsync(ImpactFeedbackStyle.Heavy)
    //use event position
    setPosition({
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    })
    //place circle
    //increase animation
    //set circle to new color
    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      scale.setValue(0)

      setbackgroundColor(newColor)
    })

    const newColor: IColors = getRandomColor(backgroundColor)

    //set to old bg color
    setbackgroundColor(newColor)

    //todo circle over text
    //fade in
    //setTextColor(checkContrast(newColor.rgb))
    const fadeInText = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        fade.setValue(0)
      })
    }

    //vibrate over device
  }
  return (
    <Pressable
      onPress={handleNewColor}
      style={[styles.container, { backgroundColor: backgroundColor.hex }]} //[] array gebruiken geen () voor jouw styling en de inlne styling samen te gebruiken
    >
      <View
        style={[
          styles.circle,
          {
            //inline-styling
            top: position.y,
            left: position.x,
            // transform: [
            //   { translateX: -circleSize / 2 },
            //   { translateY: -circleSize / 2 },
            //   { scale: scale },
            // ],
            backgroundColor: backgroundColor.hex,
          },
        ]}
      ></View>
      <Animated.View>
        <Text style={styles.name}>{backgroundColor.name}</Text>
        <Text>{[backgroundColor.hex]}</Text>
        <Text>{[backgroundColor.rgb]}</Text>

        <Text>Tap anywhere for new color</Text>

        <Pressable
          onPress={() => {
            navigate('Settings')
          }}
          style={null}
        >
          <Text>Go to Settings</Text>
        </Pressable>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 34,
    justifyContent: 'center',
  },
  circle: {
    width: Math.sqrt(
      Math.pow(
        Dimensions.get('screen').width + Dimensions.get('screen').height,
        2,
      ),
      // +  Math.pow(
      //   Dimensions.get('window').width + Dimensions.get('window').width,
      //   2,
      // ),
    ),

    height: Math.sqrt(
      Math.pow(
        Dimensions.get('window').width + Dimensions.get('window').width,
        2,
      ) +
        Math.pow(
          Dimensions.get('window').width + Dimensions.get('window').width,
          2,
        ),
    ),

    backgroundColor: 'red',
    borderRadius: 999,
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    left: Dimensions.get('window').width / 2,
    transform: [
      {
        translateX:
          Dimensions.get('window').width + Dimensions.get('window').width / 2,
      },
      { translateY: Dimensions.get('window').height / 2 },
      { scale: 0.1 },
    ],
  },
  name: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 24,
  },
  hint: {
    fontStyle: 'italic',
    marginTop: 16,
    marginBottom: 48,
  },
  linkToSettings: {
    marginTop: 20,
    fontWeight: 'light',
  },
})
