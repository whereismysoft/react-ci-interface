import { useState } from 'react'
import classNames from 'classnames'

import FormField from 'components/FormField'
import ContentBlock from 'ui/ContentBlock'
import { FormCancelButton, FormSubmitButton } from 'ui/Button'
import FormBlock from 'ui/FormBlock'

import { mocks } from 'utils'

import css from './styles.css'

const repositoryRegexp = /(^[0-9A-Za-z_-]+\/[0-9A-Za-z_-]+$)|(^[0-9A-Za-z_-]+\/?$)/

function cloneRepository(data) {
    return new Promise((resolve, reject) => {
        localStorage.setItem('ci-data', JSON.stringify({ ...data, builds: mocks }));
        setTimeout(() => {
            if (repositoryRegexp.test(data.repository) && data.commands) {
                resolve()
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

export default ({ history, onSyncError }) => {
    const [fieldsValues, setFieldsValues] = useState(initialState)

    const [isButtonDisabled, setButtonDisabled] = useState(false)

    const onFormSubmit = (e) => {
        e.preventDefault()

        setButtonDisabled(true)

        cloneRepository(fieldsValues)
            .then(() => {
                setButtonDisabled(false)
                history.push('/')
            })
            .catch(err => {
                onSyncError(err)
                setButtonDisabled(false)
            })

    }

    const onInputChange = (fieldName) => (e) => setFieldsValues(state => ({ ...state, [fieldName]: e.target.value }))
    const onInputClear = (fieldName) => () => setFieldsValues(state => ({ ...state, [fieldName]: '' }))
    const onCancel = () => setFieldsValues(initialState)

    return (
        <div>
            <ContentBlock>
                <h2 className={css.title}>Settings</h2>
                <p className={classNames(css.description, css.descriptionMargin)}>
                    Configure repository connection and synchronize settings
                </p>
                <FormBlock onSubmit={onFormSubmit}>
                    <div className={css.formFieldWrapper}>
                        <FormField
                            title="GitHub repository"
                            name="repository"
                            value={fieldsValues.repository}
                            onChange={onInputChange('repository')}
                            onClear={onInputClear('repository')}
                            placeholder="user-name/repo-name"
                            isRequired
                            regexp={repositoryRegexp}
                        />
                    </div>
                    <div className={css.formFieldWrapper}>
                        <FormField
                            title="Build command"
                            name="commands"
                            value={fieldsValues.commands}
                            onChange={onInputChange('commands')}
                            onClear={onInputClear('commands')}
                            placeholder="command to start build"
                            isRequired
                        />
                    </div>
                    <div className={css.formFieldWrapper}>
                        <FormField
                            title="Main branch"
                            name="branch"
                            value={fieldsValues.branch}
                            onChange={onInputChange('branch')}
                            onClear={onInputClear('branch')}
                            setBuildCommands
                            placeholder="main branch name"
                            isRequired
                        />
                    </div>
                    <div className={css.rowFormFieldWrapper}>
                        <FormField
                            title="Synchronize every"
                            name="interval"
                            value={fieldsValues.interval}
                            onChange={onInputChange('interval')}
                            onClear={onInputClear('interval')}
                            placeholder="0"
                            maxlength="3"
                            type="number"
                            regexp={/^\d+$/g}
                        />
                        {" "}
                        <span>minutes</span>
                    </div>
                    <div className={css.formButtons}>
                        <FormSubmitButton onClick={onFormSubmit} isDisabled={isButtonDisabled}>
                            Save
                        </FormSubmitButton>
                        <FormCancelButton isDisabled={isButtonDisabled} onClick={onCancel} />
                    </div>
                </FormBlock>
            </ContentBlock>
        </div >
    )
}