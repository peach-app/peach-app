import React from 'react';
import styled from 'styled-components';
import { default as ImportedModal } from 'react-native-modal';
import { withTheme } from 'styled-components/native';

const ModalWrapper = styled.View`
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
}) => (
  <ImportedModal
    isVisible={isOpen}
    animation="slideInUp"
    animationOut="slideOutDown"
    onBackdropPress={shouldCloseOnBackdropClick && onClose}
    style={{ justifyContent: 'flex-end', margin: 0 }}
    backdropColor={theme.foreground}
  >
    <ModalWrapper>{children}</ModalWrapper>
  </ImportedModal>
);

export const Modal = withTheme(ModalComponent);
