import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, description, icon }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                </div>
                <div className="modal-body">
                    {icon && <div className="modal-icon">{icon}</div>}
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;