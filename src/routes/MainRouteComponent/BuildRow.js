import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';

import { msToTime } from 'utils'

import IconBlock from 'ui/Icon'

import css from './styles.css'


function getBuildStatus(status) {
    switch (status) {
        case 'ready':
            return 'success'
        default:
            return status
    }
}

export default ({
    status,
    id,
    title,
    branch,
    hash,
    author,
    date,
    duration
}) => {
    const localDate = moment.unix(date / 1000).format('DD MMM, hh:mm')
    const statusType = getBuildStatus(status)

    const idColors = {
        [css.failed]: statusType === 'failed',
        [css.pending]: statusType === 'pending',
        [css.success]: statusType === 'success',
    }

    return (<div className={css.buildRow}>
        <div><IconBlock type={statusType} /></div>
        <div className={css.buildRowContent}>
            <div className={css.buildDescription}>
                <div className={css.buildHeader}>
                    <span className={classNames(css.id, idColors)}>{id}</span>
                    {" "}
                    <span className={css.buildTitle}>{title}</span>
                </div>
                <div className={css.buildCommit}>
                    <span><IconBlock type="commit" width="16" height="8" /></span>
                    {" "}
                    <span className>{branch}</span>
                    {" "}
                    <span className={css.commitHash}>{hash}</span>
                    <span className={css.authorIcon}><IconBlock type="user" width="12" height="14" /></span>
                    {" "}
                    <span>{author}</span>
                </div>
            </div>
            <div className={css.commitTime}>
                <div className={css.commitTimeInfo}>
                    <span className={css.commitTimeIcon}><IconBlock type="calendar" width="14" height="16" /></span>
                    <span className={css.commitTimeValue}>{localDate}</span>
                </div>
                <div className={css.commitTimeInfo}>
                    <span className={css.commitTimeIcon}><IconBlock type="timer" width="13" height="16" /></span>
                    <span className={css.commitTimeValue}>{msToTime(duration)}</span>
                </div>
            </div>
        </div>
    </div>)
}