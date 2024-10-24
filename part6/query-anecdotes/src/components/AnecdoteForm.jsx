import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdotes } from '../requests'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient =  useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({type:'ERROR', payload:'too short anecdote, must have length 5 or more'})
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes:0})

    notificationDispatch({type:'ADD', payload: content})
    setTimeout(() => {
      notificationDispatch({type:'CLEAR'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
