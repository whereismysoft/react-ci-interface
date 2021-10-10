import ContentBlock from 'ui/ContentBlock'

import Builds from './Builds';
import Info from './Info';

import css from './styles.css'

export default ({ buildsData }) => (
    <ContentBlock>
        <div className={css.mainPageBlock}>
            {buildsData.items?.length ? <Builds builds={buildsData} /> : <Info />}
        </div>
    </ContentBlock>
)