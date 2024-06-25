const Total = (props) => {
  const total = props.parts.reduce((total, part) => total + part.exercises, 0);

  return (
      <p>Number of exercises {total}</p>
  );
};

export default Total;