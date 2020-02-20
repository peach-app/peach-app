import React, { useContext } from 'react';
import ModalContext from '../../../contexts/Modal';
import Modals from './modals';

export const Modal = () => {
  const { modal, closeModal } = useContext(ModalContext);
  if (!modal.type) {
    return null;
  }
  const CurrentModal = Modals[modal.type];
  return <CurrentModal onClose={closeModal} {...modal.props} />;
};
