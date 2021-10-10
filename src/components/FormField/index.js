import React from 'react'
import Input from 'ui/Input'

const FormField = ({ regexp, onChange, name, value, ...otherProps }) => {
    const onInputChange = (e) => {
        // если инпут валиден или удаление символов - вызываем onChange
        const shouldChangeValue = (e.nativeEvent.inputType === 'deleteContentBackward' ||
            e.nativeEvent.inputType === 'deleteWordBackward' ||
            !regexp ||
            regexp.test(e.target.value))

        if (shouldChangeValue) {
            onChange(e)
        } else {
            console.error(`[ERR] invalid symbol inside ${name} field`)
        }
    }

    return <Input {...otherProps} value={value} onChange={onInputChange} />
}

const checkArePropsEqual = (prevProps, nextProps) => prevProps.value === nextProps.value

export default React.memo(FormField, checkArePropsEqual)