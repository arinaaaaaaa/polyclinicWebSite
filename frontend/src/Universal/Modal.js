import React from 'react';
import '../Styles/Modal.css';

const Modal = ({active, setActive, children}) => {
    return (
        <div className={ active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={ active ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export { Modal };