import Part from './Part';

const Content = (props) => {    
    const { course } = props

    const partsArray = course.parts.map((part) => {
        return (
            <Part key={part.id} name={part.name} exercise={part.exercises} />
        )
    })

    return (
        <div>
            {partsArray}
        </div>
    );
};

export default Content;