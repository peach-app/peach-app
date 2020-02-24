import React from 'react';
import { useModal } from '../../../contexts/Modal';
import Modals from './modals';

const RootModal = () => {
  const { modal, closeModal } = useModal();

  if (!modal.type) {
    return null;
  }

  const CurrentModal = Modals[modal.type];
  return <CurrentModal onClose={() => closeModal()} {...modal.props} />;
};

export default RootModal;
