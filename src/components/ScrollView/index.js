import React from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';

export const ScrollView = ({ children, ...props }) => (
  <ScrollViewBase keyboardDismissMode="interactive" {...props}>
    {children}
  </ScrollViewBase>
);
