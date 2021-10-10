import css from './styles.css'

export default ({ children, onSubmit }) => (
    <form className={css.form} onSubmit={onSubmit}>
        {children}
    </form>
)