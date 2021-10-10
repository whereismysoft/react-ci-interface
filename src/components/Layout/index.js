import { useSelector, useDispatch } from 'react-redux'

import { OPEN_MODAL } from "store/action"

import Header from 'components/Header'
import Footer from 'components/Footer'

import css from './styles.css'

const Layout = ({ children, title, withSettingsButton, withBuildButton, onBuildButtonClick }) => (
    <div className={css.layout}>
        <Header title={title} withSettingsButton={withSettingsButton} withBuildButton={withBuildButton} onBuildButtonClick={onBuildButtonClick} />
        <div className={css.layoutContent}>
            {children}
        </div>
        <Footer />
    </div>
)

export default Layout

export const ConnectedToStoreLayout = ({ children, title, withSettingsButton, withBuildButton }) => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const onBuildButtonClick = () => dispatch({
        type: OPEN_MODAL, payload: {
            isVisible: true,
            modalType: 'build',
        }
    })

    console.log(state)

    return (
        <div className={css.layout}>
            <Header
                title={title}
                withSettingsButton={withSettingsButton}
                withBuildButton={withBuildButton}
                onBuildButtonClick={onBuildButtonClick}
            />
            <div className={css.layoutContent}>
                {children}
            </div>
            <Footer />
        </div>
    )
}