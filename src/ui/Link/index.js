import { Link as RouteLink } from 'react-router-dom'

import css from './styles.css'

const Link = ({ path, children }) => <RouteLink className={css.link} to={path}>{children}</RouteLink>

export default Link