import css from './styles.css'

export default ({ errorText }) => (
    <div className={css.errorBlock}>
        <h1 className={css.title}>Error</h1>
        <p className={css.description}>{errorText}</p>
    </div>
)