import * as React from 'react';
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from 'react-native';
import Colors from '../constants/Colors';

export const useThemeColor = (props = { light, dark }, colorName) => {
  const colorScheme = useColorScheme();
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorScheme][colorName];
  }
};

export const View = ({ style, ...otherProps }) => {
  const backgroundColor = useThemeColor({ light, dark }, 'background');
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export const Text = ({ style, ...otherProps }) => {
  const color = useThemeColor({ light, dark }, 'text');
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
