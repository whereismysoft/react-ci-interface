import { Route } from "react-router-dom";

import { getValues } from 'utils'

import { ConnectedToStoreLayout } from 'components/Layout'

import MainRouteComponent from "routes/MainRouteComponent";
import SettingsRouteComponent from "routes/SettingsRouteComponent";
import { ConnectedToStoreModal } from 'components/Modal';

const App = ({ location: { pathname } }) => {
    const { repository, builds = { items: [] } } = getValues()
    const isMainPage = pathname === '/'
    const isBuildButtonVisible = Boolean(builds?.items?.length && isMainPage)
    const layputTitle = isMainPage && repository || 'School CI server'

    const openErrorModal = (err) => {
        setErrorText(err)
        setModalType('error')
        setModalVisibility(true)
    }

    return (
        <ConnectedToStoreLayout
            title={layputTitle}
            withSettingsButton={isMainPage}
            withBuildButton={isBuildButtonVisible}
        >
            <Route exact path="/" render={(props) => <MainRouteComponent {...props} buildsData={builds} />} />
            <Route path="/settings" render={(props) => <SettingsRouteComponent {...props} onSyncError={openErrorModal} />} />
            <ConnectedToStoreModal />
        </ConnectedToStoreLayout >
    )
}

export default App