import React from 'react';
import ImportedModal from 'react-modal';
import styled from 'styled-components/native';

const Main = styled.View`
  background: ${props => props.theme.background};
  min-height: 100%;
`;

export const Modal = ({ children, isOpen, onClose }) => {
  return (
    <ImportedModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          padding: 0,
          border: 0,
        },
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <Main>{children}</Main>
    </ImportedModal>
  );
};
