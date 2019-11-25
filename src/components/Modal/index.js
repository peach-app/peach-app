import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

export default ({ isOpen, onClose, shouldCloseOnBackdropClick, children }) => (
  <Modal
    isVisible={isOpen}
    animation="slideInUp"
    animationOut="slideOutDown"
    onBackdropPress={shouldCloseOnBackdropClick && onClose}
    style={{ justifyContent: 'flex-end', margin: 0 }}
  >
    <View
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 50,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </View>
  </Modal>
);
