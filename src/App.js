import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect( () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Logged in successfully')
      setTimeout( () => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification('Error: wrong credentials entered')
      setTimeout( () => {
        setNotification(null)
      }, 5000)
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
    setNotification('logged out successfully')
    setTimeout( () => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async(newObject) => {

    try {
      const createdblog = await blogService.postBlog(newObject)
      setBlogs(blogs.concat(createdblog))
      setNotification('new blog created successfully')
      setTimeout( () => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification(`Error: creating blog make sure fields are filled appropriately`)
      setTimeout( () => {
        setNotification(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    return (
      <BlogForm createBlog={addBlog} user={user}/>
    )
  }

  return (
    <div>
      <Notification message={notification} />
      { 
        user === null? 
        loginForm():
        <div>
          <h2>blogs</h2> 
          <p>{user.name} is logged in <button type = "button" onClick = {logout} >logout</button></p>
          
          {blogForm()}
          { blogs.map(blog => <Blog key={blog.id} blog={blog} />) } 
        </div> 
        
      }
    </div>
  )
}

export default App