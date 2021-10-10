import classNames from 'classnames'

import CloseIcon from 'icons/close.svg'

import css from './styles.css'

export default ({
    name,
    title,
    isRequired,
    onChange,
    onClear,
    value,
    placeholder,
    type,
    maxLength,
}) => {
    const isNumberInput = type === 'number'
    const isClearButtonVisible = value && !isNumberInput

    const requiredMark = <span className={css.formFieldRequiredMark}>*</span>

    return (
        <label name={name} className={classNames(css.formField, { [css.displayInRow]: isNumberInput })}>
            <span className={css.formFieldTitle}>
                {title} {isRequired && requiredMark}
            </span>
            <input
                type="text"
                className={css.formFieldInput}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                required={isRequired}
                maxLength={maxLength}
            />
            {isClearButtonVisible && <button
                className={css.formFieldCloseIcon}
                type="clear"
                onClick={onClear}>
                <CloseIcon width="16" height="16" className={css.icon} />
            </button>}
        </label>
    )
}