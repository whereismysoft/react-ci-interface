import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";

import { OPEN_MODAL } from "store/action"

import Header from 'components/Header'
import Footer from 'components/Footer'

import css from './styles.css'

const Layout = ({ children, title, withSettingsButton, withBuildButton, onBuildButtonClick }) => (
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

export default Layout

export const ConnectedToStoreLayout = ({ children }) => {
    const state = useSelector(state => state.ci)
    const dispatch = useDispatch()
    const location = useLocation()
    const onBuildButtonClick = () => dispatch({
        type: OPEN_MODAL, payload: {
            isVisible: true,
            modalType: 'build',
        }
    })

    const isMainPage = location.pathname === '/'
    const isBuildButtonVisible = Boolean(state.builds?.items?.length && isMainPage)

    return (
        <Layout
            title={state.repository}
            onBuildButtonClick={onBuildButtonClick}
            withSettingsButton={isMainPage}
            withBuildButton={isBuildButtonVisible}
        >
            {children}
        </Layout>
    )
}