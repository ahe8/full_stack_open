import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { clearNotification, createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter) {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
        return state.anecdotes
    })

    const dispatch = useDispatch()

    const vote = ({id, content, votes}) => {
        dispatch(addVote(id, votes))
        
        dispatch(createNotification(`you voted '${content}'`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList