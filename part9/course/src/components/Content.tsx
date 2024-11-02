import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
    courseParts: CoursePart[];
};

const Content = (props: ContentProps): JSX.Element[] => {
    return props.courseParts.map(coursePart =>
        <div key={coursePart.name}>
            <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
            <Part coursePart={coursePart} />
        </div>
    )
};

export default Content;