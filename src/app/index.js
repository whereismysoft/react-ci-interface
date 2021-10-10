import { useState } from 'react'
import { Route } from "react-router-dom";

import { getValues } from 'utils'

import Layout from 'components/Layout'

import MainRouteComponent from "routes/MainRouteComponent";
import SettingsRouteComponent from "routes/SettingsRouteComponent";
import Modal from 'components/Modal';

// import css from './styles.css'

const App = ({ location: { pathname } }) => {
    const [isModalVisible, setModalVisibility] = useState(false)
    const [modalType, setModalType] = useState(false)
    const [errorText, setErrorText] = useState('')

    const { repository, builds = { items: [] } } = getValues()
    const isMainPage = pathname === '/'
    const isBuildButtonVisible = Boolean(builds?.items?.length && isMainPage)
    const layputTitle = isMainPage && repository || 'School CI server'

    const onBuildButtonClick = () => {
        setModalType('build')
        setModalVisibility(true);
    }

    const onCloseModal = () => {
        setModalVisibility(false)
        setErrorText('')
        setModalType('')
    }

    const openErrorModal = (err) => {
        setErrorText(err)
        setModalType('error')
        setModalVisibility(true)
    }

    return (
        <Layout
            title={layputTitle}
            withSettingsButton={isMainPage}
            withBuildButton={isBuildButtonVisible}
            onBuildButtonClick={onBuildButtonClick}
        >
            <Route exact path="/" render={(props) => <MainRouteComponent {...props} buildsData={builds} />} />
            <Route path="/settings" render={(props) => <SettingsRouteComponent {...props} onSyncError={openErrorModal} />} />
            <Modal
                closeModal={onCloseModal}
                isVisible={isModalVisible} type={modalType}
                errorText={errorText}
            />
        </Layout >
    )
}

export default App