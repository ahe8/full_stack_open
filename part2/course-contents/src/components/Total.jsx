const Total = (props) => {
  const { course } = props;

  const total = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
      <p>Number of exercises {total}</p>
  );
};

export default Total;