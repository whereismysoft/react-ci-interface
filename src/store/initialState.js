export const initialModalState = {
    isVisible: false,
    modalType: '',
    errorText: '',
}

const initialCiStore = {
    repository: 'School CI server',
    commands: '',
    branch: '',
    interval: '',
    builds: {
        items: []
    }
}


export const initialState = {
    modal: initialModalState,
    ci: initialCiStore
}

