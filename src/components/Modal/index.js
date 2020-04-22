import React from 'react';
import {
  Modal as ImportedModal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { Main, Content, Cover } from './styles';

const DefaultWrapper = ({ children }) => (
  <Content>
    <ScrollView>{children}</ScrollView>
  </Content>
);

export const Modal = ({ children, isOpen, customWrapper, onClose }) => {
  const Wrapper = customWrapper || DefaultWrapper;

  return (
    <ImportedModal
      visible={isOpen}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Main>
          <Cover onPress={onClose} />
          <Wrapper>{children}</Wrapper>
        </Main>
      </KeyboardAvoidingView>
    </ImportedModal>
  );
};
