import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { default as ImportedModal } from 'react-native-modal';

export const ModalWrapper = styled.View`
background-color: ${({ theme }) => theme.background}
padding-horizontal: 20px;
padding-vertical: 50px;
border-radius: 4px;
borderColor: ${({ theme }) => theme.foreground}
`;

const ModalComponent = ({
  isOpen,
  onClose,
  shouldCloseOnBackdropClick,
  children,
  theme,
  customWrapper,
}) => {
  const Wrapper = customWrapper || ModalWrapper;
  return (
    <ImportedModal
      isVisible={isOpen}
      animation="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={shouldCloseOnBackdropClick && onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropColor={theme.foreground}
    >
      <Wrapper>{children}</Wrapper>
    </ImportedModal>
  );
};

export const Modal = withTheme(ModalComponent);
