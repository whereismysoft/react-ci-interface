import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

export default ({ closeModal }) => {
    const modalRef = useRef(null);
    const modalState = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useOutsideClickHandler(modalRef, () => {
        dispatch({ type: 'closeModal' })
    })

    return ReactDOM.createPortal(
        <div className={classNames(css.modal, { [css.visible]: modalState.isVisible })}>
            <div className={css.modalContent} ref={modalRef}>
                {getModalContentByType(modalState.modalType, { closeModal, isVisible: modalState.isVisible, errorText: modalState.errorText })}
            </div>
        </div>,
        element
    );
}