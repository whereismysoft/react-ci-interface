import { initialState } from "./initialState"

export const reducer = (state = initialState, { type, payload }) => {
    const updateModalState = ({ isVisible, modalType, errorText }) => {
        return {
            ...state,
            modal: {
                isVisible,
                modalType,
                errorText,
            }
        }
    }

    switch (type) {
        case 'openModal':
            return updateModalState(payload)

        case 'closeModal':
            return updateModalState({ isVisible: false, modalType: '', errorText: '' })
        default:
            console.error(`[Error store] action with type "${type}" not exist`)
            return state
    }
}