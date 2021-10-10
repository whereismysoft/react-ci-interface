import { initialState, initialModalState } from "./initialState"
import { OPEN_MODAL, CLOSE_MODAL, UPDATE_CI_DATA } from "./action"

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case OPEN_MODAL:
            return updateModalState(state, payload)
        case CLOSE_MODAL:
            return updateModalState(state, initialModalState)
        case UPDATE_CI_DATA:
            return updateCiData(state, payload)
        default:
            console.error(`[Error store] action with type "${type}" not exist`)
            return state
    }
}

function updateCiData(state, payload) {
    return {
        ...state,
        ci: payload
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