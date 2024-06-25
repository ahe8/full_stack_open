const Total = (props) => {
  const { course } = props;

  const total = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
      <p><b>total of {total} exercises</b></p>
  );
};

export default Total;