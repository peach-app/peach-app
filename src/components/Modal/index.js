import React from 'react';
import { Modal as ImportedModal, ScrollView } from 'react-native';

import { Main, Content, Cover } from './styles';
import { KeyboardAvoidingView } from '../KeyboardAvoidingView';

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
      <KeyboardAvoidingView>
        <Main>
          <Cover onPress={onClose} />
          <Wrapper>{children}</Wrapper>
        </Main>
      </KeyboardAvoidingView>
    </ImportedModal>
  );
};
