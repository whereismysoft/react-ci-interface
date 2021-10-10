import Button from 'ui/Button'
import BuildRow from './BuildRow'

import css from './styles.css'

export default ({ builds: { items, count } }) => {
    return (
        <div className={css.buildsBlock}>
            <div className={css.builds}>
                {items.map(build => (<BuildRow key={build.id} {...build}>build</BuildRow>))}
            </div>
            {count > items?.length && <Button size="sm" color="grey">Show more</Button>}
        </div>
    )
}