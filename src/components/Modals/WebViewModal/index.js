import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { Dimensions, Platform } from 'react-native';

import WebView from '../../WebView';

const Container = styled.View`
  height: ${Dimensions.get('window').height - 200}px;
`;

const WebViewModal = ({ uri, onClose }) => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      window.open(uri, '_blank');
    }
  }, [uri]);

  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <Modal isOpen onClose={onClose}>
      <Container>
        <WebView source={uri} onClose={onClose} />
      </Container>
    </Modal>
  );
};

WebViewModal.propTypes = {
  uri: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WebViewModal;
