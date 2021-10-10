import classNames from 'classnames'

import { LinkButton } from 'ui/Button'

import MainPageIcon from 'icons/main_logo.svg'

import css from './styles.css'

export default () => (
    <div className={css.centredInfo}>
        <MainPageIcon />
        <p className={classNames(css.infoText, css.infoTextMargin)}>
            Configure repository connection and synchronize settings
        </p>
        <LinkButton
            path="/settings"
            size="md"
            color="yellow"
        >
            Open settings
        </LinkButton>
    </div>
)