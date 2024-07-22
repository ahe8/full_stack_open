import { useRef } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = (props) => {
    const usernameRef = useRef("")
    const passwordRef = useRef("")

    const { setUser, createNotification } = props;

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const credentials = {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }
            
            const user = await loginService.login(credentials);

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            
            setUser(user)
            
            blogService.setToken(user.token)
        } catch (exception) {
            createNotification('error', 'wrong username or password')
        }
    }

    return (
        <div>
            <h3>log in to application</h3>

            <form onSubmit={handleLogin}>
                <div>username<input type="text" ref={usernameRef}/></div>
                <div>password<input type="password" ref={passwordRef}/></div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login