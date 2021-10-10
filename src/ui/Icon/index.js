import classNames from 'classnames'

import CloseIcon from 'icons/close.svg'
import SuccessIcon from 'icons/success.svg'
import PendingIcon from 'icons/pending.svg'
import CommitIcon from 'icons/commit-icon.svg'
import TimerIcon from 'icons/timer.svg'
import CalendarIcon from 'icons/calendar.svg'
import UserIcon from 'icons/user.svg'

import css from './styles.css'

export default ({ type, width, height, iconClass }) => {
    switch (type) {
        case 'failed':
            return <CloseIcon className={classNames(css.failedIcon, css.statusIcon)} />
        case 'pending':
            return <PendingIcon className={css.statusIcon} />
        case 'success':
            return <SuccessIcon className={css.statusIcon} />
        case 'commit':
            return <CommitIcon width={width} height={height} className={css.commitIcon} />
        case 'timer':
            return <TimerIcon width={width} height={height} className={css.timerIcon} />
        case 'calendar':
            return <CalendarIcon width={width} height={height} className={css.calendarIcon} />
        case 'user':
            return <UserIcon width={width} height={height} className={css.userIcon} />
        default:
            return null
    }
}