import { useRef } from 'react'

const CreateBlogForm = ({ createBlog }) => {
    const titleRef = useRef('')
    const authorRef = useRef('')
    const urlRef = useRef('')


    const handleSubmit = (event) => {
        event.preventDefault()

        const newBlog = {
            'title': titleRef.current.value,
            'author': authorRef.current.value,
            'url': urlRef.current.value
        }

        createBlog(newBlog)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>title:<input type="text" ref={titleRef} name='title' /></div>
                <div>author:<input type="text" ref={authorRef} name='author' /></div>
                <div>url:<input type="text" ref={urlRef} name='url' /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm