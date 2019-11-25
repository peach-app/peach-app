import React, { useContext } from 'react';
import ModalContext from '../../../contexts/Modal';
import Modals from './modals';

const RootModal = () => {
  const { modal, closeModal } = useContext(ModalContext);
  if (!modal.type) {
    return null;
  }
  const CurrentModal = Modals[modal.type];
  return <CurrentModal onClose={closeModal} {...modal.props} />;
};

export default RootModal;
