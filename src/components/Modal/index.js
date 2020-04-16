import React from 'react';
import { Modal as ImportedModal } from 'react-native';

import { Main, Content } from './styles';

export const Modal = ({ children, isOpen, customWrapper }) => {
  const Wrapper = customWrapper || Content;

  return (
    <ImportedModal
      visible={isOpen}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent
    >
      <Main>
        <Wrapper>{children}</Wrapper>
      </Main>
    </ImportedModal>
  );
};
