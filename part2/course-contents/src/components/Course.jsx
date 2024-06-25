import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = (props) => {
    const { course } = props;

    return(
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

export default Course;