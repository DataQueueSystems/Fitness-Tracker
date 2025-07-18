import React from 'react';

import { Text, useTheme } from 'react-native-paper';

const CustomText = ({ style, ...props }) => {
  let {colors}=useTheme();
  return <Text  style={[{color:colors.text},style,]} {...props} />;
};

export default CustomText;
