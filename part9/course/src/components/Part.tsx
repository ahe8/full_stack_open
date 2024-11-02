import { CoursePart } from '../types';


const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface PartProps {
    coursePart: CoursePart;
}

const Part = (props: PartProps): JSX.Element => {
    const { coursePart } = props;

    switch (coursePart.kind) {
        case "basic":
            return <div>{coursePart.description}</div>
        case "group":
            return <div>project exercises {coursePart.groupProjectCount}</div>
        case "background":
            return (
                <>
                    <div>{coursePart.description}</div>
                    <div>{coursePart.backgroundMaterial}</div>
                </>)
        case "special":
            return (
                <>
                    <div>{coursePart.description}</div>
                    <div>required skills: {coursePart.requirements.toString()}</div>
                </>
            )
        default:
            return assertNever(coursePart);
    }
};


export default Part;