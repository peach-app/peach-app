import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { withTheme } from 'styled-components/native';

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
    <View
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: 20,
        paddingVertical: 50,
        borderRadius: 4,
        borderColor: 'white',
      }}
    >
      {children}
    </View>
  </Modal>
);

export default withTheme(ModalComponent);
