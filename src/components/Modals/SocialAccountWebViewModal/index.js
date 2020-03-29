import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { Dimensions } from 'react-native';
import WebView from '../../WebView';

const Container = styled.View`
  height: ${Dimensions.get('window').height - 200}px;
`;

const ModalWrapper = styled.View`
background-color: ${({ theme }) => theme.white}
border-radius: 4px;
borderColor: ${({ theme }) => theme.foreground}
`;

const SocialAccountWebViewModal = ({ uri, onClose }) => (
  <Modal
    isOpen
    onClose={onClose}
    shouldCloseOnBackdropClick
    customWrapper={ModalWrapper}
  >
    <Container>
      <WebView source={uri} onClose={onClose} />
    </Container>
  </Modal>
);
SocialAccountWebViewModal.propTypes = {
  uri: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SocialAccountWebViewModal;
