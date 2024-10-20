import { useRef } from 'react'
import blogService from '../services/blogs'


const CreateBlogForm = (props) => {
    const { setBlogs, createNotification, blogFormRef } = props
    
    const titleRef = useRef('')
    const authorRef = useRef('')
    const urlRef = useRef('')
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newBlog = {
            'title': titleRef.current.value,
            'author': authorRef.current.value,
            'url': urlRef.current.value
        }
        try {
            const savedBlog = await blogService.create(newBlog)
            setBlogs(blogs => [...blogs, savedBlog])   
            blogFormRef.current.toggleVisibility()
            createNotification('success', `a new blog ${savedBlog.title} by ${savedBlog.author} added`)
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>title:<input type="text" ref={titleRef}/></div>
                <div>author:<input type="text" ref={authorRef}/></div>
                <div>url:<input type="text" ref={urlRef}/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm