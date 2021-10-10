import { useState, useRef } from 'react'
import ReactDOM from "react-dom";
import classNames from 'classnames';

import { useOutsideClickHandler } from 'utils'

import NewBuild from 'components/NewBuild';
import ErrorBlock from 'components/ErrorBlock';

import css from './styles.css'

const element = document.getElementById('app-modal')

const getModalContentByType = (type, props) => {
    switch (type) {
        case 'build':
            return <NewBuild {...props} />
        case 'error':
            return <ErrorBlock {...props} />
        default:
            return null
    }
}

export default ({ isVisible, closeModal, type, errorText }) => {
    const modalRef = useRef(null);

    useOutsideClickHandler(modalRef, closeModal)

    return ReactDOM.createPortal(
        <div className={classNames(css.modal, { [css.visible]: isVisible })}>
            <div className={css.modalContent} ref={modalRef}>
                {getModalContentByType(type, { closeModal, isVisible, errorText })}
            </div>
        </div>,
        element
    );
}