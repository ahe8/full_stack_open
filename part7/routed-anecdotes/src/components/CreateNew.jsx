import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ setNotification, addNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.fields.value,
            author: author.fields.value,
            info: info.fields.value,
            votes: 0
        })
        navigate('/')

        setNotification(`a new anecdote ${content.fields.value} created!`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
    }

    const resetFields = () => {
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content.fields} />
                </div>
                <div>
                    author
                    <input {...author.fields} />
                </div>
                <div>
                    url for more info
                    <input {...info.fields} />
                </div>
                <button>create</button>
                <button type="button" onClick={resetFields}>reset</button>
            </form>
        </div>
    )

}

export default CreateNew