import { Route } from "react-router-dom";
import { useSelector } from 'react-redux'

// import { getValues } from 'utils'

import { ConnectedToStoreLayout } from 'components/Layout'

import MainRouteComponent from "routes/MainRouteComponent";
import { ConnectedToStoreSettings } from "routes/SettingsRouteComponent";
import { ConnectedToStoreModal } from 'components/Modal';

const App = () => {
    // const { repository, builds = { items: [] } } = getValues()
    const builds = useSelector(state => state.ci.builds)

    return (
        <ConnectedToStoreLayout>
            <Route exact path="/" render={() => <MainRouteComponent buildsData={builds} />} />
            <Route path="/settings" component={ConnectedToStoreSettings} />
            <ConnectedToStoreModal />
        </ConnectedToStoreLayout >
    )
}

export default App