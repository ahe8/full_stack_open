const Total = (props) => {
    const total = props.exercises.reduce((partialSum, n) => partialSum + n, 0);

    return (
        <p>Number of exercises {total}</p>
    );
};

export default Total;