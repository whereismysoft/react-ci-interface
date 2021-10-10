import { useState } from 'react'
import classNames from 'classnames'

import { withRouter } from 'react-router'

import FormField from 'components/FormField'
import { FormCancelButton, FormSubmitButton } from 'ui/Button'
import FormBlock from 'ui/FormBlock'

import css from './styles.css'

const NewBuild = ({ history, closeModal }) => {
    const [hash, setHash] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log('[submited]')
    }

    const onCancel = (e) => {
        e.preventDefault()
        setHash('')
        // history.push('/')
        closeModal()
    }

    const onFormChange = (e) => setHash(e.target.value)

    return (
        <div className={css.newBuild}>
            <h2 className={css.title}>New build</h2>
            <FormBlock onSubmit={onFormSubmit}>
                <FormField
                    title="Enter the commit hash which you want to build"
                    name="repository"
                    value={hash}
                    onChange={onFormChange}
                    onClear={() => setHash('')}
                    placeholder="Commit hash"
                />
                <div className={css.formButtons}>
                    <FormSubmitButton onClick={onFormSubmit} isDisabled={!hash}>
                        Run build
                    </FormSubmitButton>
                    <FormCancelButton onClick={onCancel} />
                </div>
            </FormBlock>
        </div >
    )
}

export default withRouter(NewBuild)