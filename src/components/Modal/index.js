import React from 'react';
import Modal from 'react-native-modal';
import styled, { withTheme } from 'styled-components/native';

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
  <Modal
    isVisible={isOpen}
    animation="slideInUp"
    animationOut="slideOutDown"
    onBackdropPress={shouldCloseOnBackdropClick && onClose}
    style={{ justifyContent: 'flex-end', margin: 0 }}
    backdropColor={theme.foreground}
  >
    <ModalWrapper>{children}</ModalWrapper>
  </Modal>
);

export default withTheme(ModalComponent);
