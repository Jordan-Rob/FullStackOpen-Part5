import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input
          type = "text"
          value = {username}
          onChange = {({ target }) => setUsername(target.value) }
          name = "Username"
          />
        </div>

        <div>
          password
          <input
          type = "password"
          value = {password}
          name = "Password"
          onChange = { ({target}) => setPassword(target.value) }
          />
        </div>  
        <button type="submit">login</button>
      </form>
    
  )

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      { 
        user === null? 
        loginForm():
        <div>
          <h2>blogs</h2> 
          <p>{user.name} is logged in</p>
          <button type = "button" onClick = {logout} >logout</button>
          { blogs.map(blog => <Blog key={blog.id} blog={blog} />) } 
        </div> 
        
      }
    </div>
  )
}

export default App