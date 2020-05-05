import React from 'react';
import {
  KeyboardAvoidingView as KeyboardAvoidingViewBase,
  Platform,
} from 'react-native';

export const KeyboardAvoidingView = ({ children }) => (
  <KeyboardAvoidingViewBase
    behavior="padding"
    style={{ flex: 1 }}
    enabled={Platform.select({
      ios: true,
      android: false,
      web: false,
    })}
  >
    {children}
  </KeyboardAvoidingViewBase>
);
