interface courseContent {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: courseContent[];
};

const Content = (props: ContentProps): JSX.Element[] => {
    return props.courseParts.map(coursePart => <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>)
};

export default Content;