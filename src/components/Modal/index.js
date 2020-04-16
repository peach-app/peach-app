import React from 'react';
import { Modal as ImportedModal } from 'react-native';

import { Main, Content, Cover } from './styles';

export const Modal = ({ children, isOpen, customWrapper, onClose }) => {
  const Wrapper = customWrapper || Content;

  return (
    <ImportedModal
      visible={isOpen}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent
    >
      <Main>
        <Cover onPress={onClose} />
        <Wrapper>{children}</Wrapper>
      </Main>
    </ImportedModal>
  );
};
