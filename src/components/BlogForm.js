import React,{useState} from 'react';

const BlogForm = ({createBlog, user}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [visible, setVisible] = useState(false)

    const hideWhenFormVisible = { display: visible? 'none':'' }
    const showWhenFormVisible = { display: visible? '':'none'}

    const addBlog = (event) => {
        event.preventDefault()
        createBlog( {
            title: title,
            author: author,
            url: url,
            user: user.username
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
      <div>
        <div style={hideWhenFormVisible}>
          <button onClick={ ()=> setVisible(true)} >New Blog</button>
        </div>
        <div style={showWhenFormVisible}>
          <form onSubmit={addBlog}>
            <h2>Create New</h2>
            <div>
              title:
              <input
              type = "text"
              value = {title}
              onChange = { ({ target }) => setTitle(target.value) }
              />
            </div>
            <div>
              author:
              <input
              type = "text"
              value = {author}
              onChange = { ({ target }) => setAuthor(target.value) }
              />
            </div>
            <div>
              url:
              <input
              type = "text"
              value = {url}
              onChange = { ({ target }) => setUrl(target.value) }
              />
            </div>
            <button type = 'submit' >Add Blog</button>
          </form>
          <button onClick={() => setVisible(false)} >Cancel</button>
        </div>
      </div>  
    )

}

export default BlogForm