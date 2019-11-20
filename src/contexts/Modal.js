import React, { useState, useContext } from 'react';

const ModalContext = React.createContext();


const initialModalState = {
    type: null,
    props: null
}

export const Provider = ({children}) => {
    const [modal, setModal] = useState(initialModalState);

    const openModal = modal => setModal(modal);

    const closeModal = () => setModal(initialModalState);

    return (
        <ModalContext.Provider value={{modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
};

export const useModal = () => useContext(ModalContext);

export default ModalContext;