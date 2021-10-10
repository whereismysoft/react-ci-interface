import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from "react-dom";
import classNames from 'classnames';

import { CLOSE_MODAL } from "store/action"
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

const Modal = ({ closeModal, isVisible, errorText, type }) => {
    const modalRef = useRef(null)

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

export default Modal

export const ConnectedToStoreModal = () => {
    const { modalType, isVisible, errorText } = useSelector(state => state.modal)

    const closeModal = () => {
        dispatch({ type: CLOSE_MODAL })
    }
    const dispatch = useDispatch()

    return <Modal closeModal={closeModal} isVisible={isVisible} errorText={errorText} type={modalType} />

}

