import classNames from 'classnames'

import ContentBlock from 'ui/ContentBlock'

import Button, { SettingsButton, BuildButton } from 'ui/Button'

import css from './styles.css'

export default ({ title, withBuildButton, withSettingsButton, onBuildButtonClick }) => (
    <div className={css.header}>
        <ContentBlock>
            <div className={css.headerContent}>
                <div className={classNames(css.headerTitle, { [css.titleBold]: withBuildButton && withSettingsButton })}>{title}</div>
                <div className={css.headerButtons}>
                    {withBuildButton && <BuildButton onClick={onBuildButtonClick} />}
                    {withBuildButton && <div className={css.spaceBetweenButtons} />}
                    {withSettingsButton && <SettingsButton small={withBuildButton} />}
                </div>
            </div>
        </ContentBlock>
    </div>
)