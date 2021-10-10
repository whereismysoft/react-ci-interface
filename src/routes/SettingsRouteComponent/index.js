import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { OPEN_MODAL, UPDATE_CI_DATA } from "store/action"


import SettingsForm from './SettingsForm'
import { mocks } from 'utils'

const repositoryRegexp = /(^[0-9A-Za-z_-]+\/[0-9A-Za-z_-]+$)|(^[0-9A-Za-z_-]+\/?$)/

function cloneRepository(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (repositoryRegexp.test(data.repository) && data.commands) {
                localStorage.setItem('ci-data', JSON.stringify({ ...data, builds: mocks }));
                resolve({ ...data, builds: mocks })
            } else {
                reject('repository and commands fields are required')
            }
        }, 1000)
        return
    })
}

const initialState = {
    repository: '',
    commands: '',
    branch: '',
    interval: ''
}

const SettingsRouteComponent = ({ history, onSyncError, onSubmit }) => {
    const [fieldsValues, setFieldsValues] = useState(initialState)
    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const onFormSubmit = (e) => {
        e.preventDefault()

        setButtonDisabled(true)

        onSubmit(fieldsValues)
            .then(() => {
                setButtonDisabled(false)
                history.push('/')
            })
            .catch(err => {
                onSyncError(err?.toString())
                setButtonDisabled(false)
            })

    }

    const onInputChange = (fieldName) => (e) => setFieldsValues(state => ({ ...state, [fieldName]: e.target.value }))
    const onInputClear = (fieldName) => () => setFieldsValues(state => ({ ...state, [fieldName]: '' }))
    const onCancel = () => setFieldsValues(initialState)

    return <SettingsForm
        onFormSubmit={onFormSubmit}
        fieldsValues={fieldsValues}
        onInputChange={onInputChange}
        onInputClear={onInputClear}
        repositoryRegexp={repositoryRegexp}
        isButtonDisabled={isButtonDisabled}
        onCancel={onCancel}
    />
}

export default SettingsRouteComponent

export const ConnectedToStoreSettings = () => {
    const dispatch = useDispatch()

    const onSyncError = (errorText) => dispatch({
        type: OPEN_MODAL, payload: {
            isVisible: true,
            modalType: 'error',
            errorText
        }
    })

    const updateCiData = (data) => dispatch({ type: UPDATE_CI_DATA, payload: data })

    const onFormSubmit = (values) => {
        return cloneRepository(values).then(values => updateCiData(values))
    }
    return <SettingsRouteComponent
        onSyncError={onSyncError}
        onSubmit={onFormSubmit}
        history={useHistory()}
    />

}