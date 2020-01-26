import React, { useContext, useEffect } from 'react';
import { useModal } from '../../../contexts/Modal';
import Modals from './modals';

const RootModal = () => {
  const { modal, closeModal } = useModal();
  
  console.log('mod', modal)
  if (!modal.type) {
    return null;
  }

  const CurrentModal = Modals[modal.type];
  return <CurrentModal onClose={() => console.log("YEE",closeModal) || closeModal()} {...modal.props} />;
};

export default RootModal;
