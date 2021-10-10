import Link from 'ui/Link'
import classNames from 'classnames'

import SettingsIcon from 'icons/setting.svg'
import PlayIcon from 'icons/play.svg'

import css from './styles.css'

const Button = ({ children, size, color, isDisabled, onClick, type }) => {
    const buttonClasses = {
        [css.buttonMd]: size === 'md',
        [css.buttonSm]: size === 'sm',
        [css.buttonYellow]: color === 'yellow',
        [css.buttonGrey]: color === 'grey',
        [css.disabled]: isDisabled,
    };

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={classNames(css.button, buttonClasses)}
        >
            {children}
        </button>
    )
}

export default Button;

export const LinkButton = ({ path, size, color, children }) => (
    <Link path={path}>
        <Button size={size} color={color}>
            {children}
        </Button>
    </Link>
)

export const SettingsButton = ({ small }) => (
    <LinkButton path="/settings" size='sm' color='grey'>
        <SettingsIcon />
        {!small && <span className={css.buttonText}>Settings</span>}
    </LinkButton>)

export const BuildButton = ({ onClick }) => (
    <Button onClick={onClick} size='sm' color='grey'>
        <PlayIcon />
        <span className={css.buttonText} >Run build</span>
    </Button>
)

export const FormSubmitButton = ({ onClick, isDisabled, children }) => (
    <Button
        onClick={onClick}
        type="submit"
        size="md"
        color="yellow"
        isDisabled={isDisabled}
    >
        {children}
    </Button>
)
export const FormCancelButton = ({ onClick, isDisabled }) => (
    <Button
        onClick={onClick}
        size="md"
        color="grey"
        isDisabled={isDisabled}
        type="cancel"
    >
        Cancel
    </Button>
)