import React, { useState, useContext } from 'react';

const ModalContext = React.createContext();

const initialModalState = {
  type: null,
  props: null,
};

export const Provider = ({ children }) => {
  const [modal, setModal] = useState(initialModalState);

  const openModal = modalArgs => setModal(modalArgs);

  const closeModal = () => console.log('LOOOOOOOG \n\n\n\n\n') || setModal(initialModalState);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalContext;
