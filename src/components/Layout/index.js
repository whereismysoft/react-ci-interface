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