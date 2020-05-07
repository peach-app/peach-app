import React from 'react';
import { ScrollView as ScrollViewBase } from 'react-native';

export const ScrollView = ({ children, ...props }) => (
  <ScrollViewBase keyboardDismissMode="on-drag" {...props}>
    {children}
  </ScrollViewBase>
);
