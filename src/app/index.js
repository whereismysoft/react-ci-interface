import { useState, useEffect } from 'react'
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { getValues } from 'utils'

import Layout from 'components/Layout'

import MainRouteComponent from "routes/MainRouteComponent";
import SettingsRouteComponent from "routes/SettingsRouteComponent";
import Modal from 'components/Modal';

const getModalState = state => state.modal
// import css from './styles.css'

const App = ({ location: { pathname } }) => {
    const [isModalVisible, setModalVisibility] = useState(false)
    const [modalType, setModalType] = useState(false)
    const [errorText, setErrorText] = useState('')

    const { repository, builds = { items: [] } } = getValues()
    const isMainPage = pathname === '/'
    const isBuildButtonVisible = Boolean(builds?.items?.length && isMainPage)
    const layputTitle = isMainPage && repository || 'School CI server'

    // const modalState = useSelector(getModalState)
    const dispatch = useDispatch()
    // console.log('[modalState]', modalState)

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

    useEffect(() => {
        dispatch({
            type: 'openModal', payload: {
                isVisible: true,
                modalType: 'error',
                errorText: '123213123123123'
            }
        })
    }, [])

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
            // closeModal={onCloseModal}
            // isVisible={isModalVisible}
            // type={modalType}
            // errorText={errorText}
            />
        </Layout >
    )
}

export default App