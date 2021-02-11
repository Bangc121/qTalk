import 'react-native-gesture-handler';

import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeType, useThemeContext } from '@dooboo-ui/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import React from 'react';

import Home from '../screen/Home/index';
import Friends from '../screen/Friends/index';
import SignIn from '../screen/SignIn';
import Chat from '../screen/Chat/index';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  default: undefined;
  Chat: undefined;
  Friends: undefined;
  BottomTabs: undefined;
}

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
  > = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
      />
    </Tab.Navigator>
  );
}

function RootNavigator(): React.ReactElement {
  const { theme, themeType } = useThemeContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: { color: theme.fontColor },
          headerTintColor: theme.tintColor,
        }}
        headerMode={
          themeType === ThemeType.DARK ? 'screen' : 'float'
        }
      >
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='BottomTabs' component={BottomTabs} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
