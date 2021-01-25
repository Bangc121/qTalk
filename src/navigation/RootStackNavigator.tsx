import 'react-native-gesture-handler';

import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeType, useThemeContext } from '@dooboo-ui/theme';

import React from 'react';

import Home from '../screen/Home/index';

export type RootStackParamList = {
  Home: undefined;
  default: undefined;
}

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
  > = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const { theme, themeType } = useThemeContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
