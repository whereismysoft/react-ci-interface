import classNames from 'classnames'

import FormField from 'components/FormField'
import ContentBlock from 'ui/ContentBlock'
import { FormCancelButton, FormSubmitButton } from 'ui/Button'
import FormBlock from 'ui/FormBlock'

import css from './styles.css'

export default ({ onFormSubmit, fieldsValues, onInputChange, onInputClear, repositoryRegexp, isButtonDisabled, onCancel }) => (
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