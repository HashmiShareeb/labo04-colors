import {
  ParamListBase,
  StackNavigationState,
  TypedNavigator,
} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { ComponentType } from 'react'
import RandomizedColor from './RandomizedColor'
import Settings from './Settings'
import {StyleSheet} from 'react-native'

const Stack: TypedNavigator<
  ParamListBase,
  StackNavigationState<ParamListBase>,
  StackNavigationOptions,
  StackNavigationEventMap,
  ComponentType<any>
> = createStackNavigator()

const screenOptions = {
  headerShown:false,
}
export default () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={RandomizedColor} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

