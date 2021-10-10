import classNames from 'classnames'

import ContentBlock from 'ui/ContentBlock'

import { Link } from 'react-router-dom'

import css from './styles.css'

const Footer = () => (
    <footer className={css.footer}>
        <ContentBlock>
            <div className={css.footerContent}>
                <div className={css.footerLinks}>
                    <Link className={classNames(css.footerLink, css.footerText)}>Support</Link>
                    <Link className={classNames(css.footerLink, css.footerText)}>Learning</Link>
                    <Link className={classNames(css.footerLink, css.footerText)}>Русская версия</Link>
                </div>
                <div className={css.footerText}>&copy; 2021 Yury</div>
            </div>
        </ContentBlock>
    </footer>
)

export default Footer