import { initialState, initialModalState } from "./initialState"

import { OPEN_MODAL, CLOSE_MODAL } from "./action"

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_MODAL:
            return updateModalState(state, payload)
        case CLOSE_MODAL:
            return updateModalState(state, initialModalState)
        default:
            console.error(`[Error store] action with type "${type}" not exist`)
            return state
    }
}

function updateModalState(state, { isVisible, modalType, errorText = '' }) {
    return {
        ...state,
        modal: {
            isVisible,
            modalType,
            errorText,
        }
    }
}