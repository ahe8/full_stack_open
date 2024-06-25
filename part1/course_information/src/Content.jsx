import Part from './Part';

const Content = (props) => {    
    const partsArray = props.parts.map((part, i) => {
        return (
            <Part key={i} name={part.name} exercise={part.exercises} />
        )
    })

    return (
        <div>
            {partsArray}
        </div>
    );
};

export default Content;