import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState( new Array(anecdotes.length).fill(0));

  const voteForAnecdote = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }

  const generateAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  
  const getIndexOfAnecdoteWithMostVotes = () => {
    let indexWithMostVotes = 0;
    for(let i = 1; i < points.length; i++) {
      if(points[i] > points[indexWithMostVotes]) {
        indexWithMostVotes = i;
      }
    }
    return indexWithMostVotes;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>

      {points[getIndexOfAnecdoteWithMostVotes()] > 0 && 
      <>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[getIndexOfAnecdoteWithMostVotes()]}</p>
        <p>has {points[getIndexOfAnecdoteWithMostVotes()]} votes</p>
      </>
      }
    </div>
  )
}

export default App