import { StyleProp, TextStyle } from 'react-native';

import { SFC } from 'react';

export interface User {
  userId: string | null;
  nickname: string | null;
  email: string | null;
  profile: string | null;
}

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
