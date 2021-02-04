import React, {useState} from 'react'
const Blog = ({ blog, addLike, delBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible? 'none':''}
  const showWhenVisible = { display: visible? '': 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const delStyle = {
    color: 'white',
    backgroundColor: 'blue'
  }

  if(visible === false){
  return(
    <div style={blogStyle}>
      <div style={ hideWhenVisible }>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
      </div>
    </div>
  )}
  else if(visible === true){
    return (
      <div style={blogStyle}>
        <div style={ showWhenVisible }>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={addLike}>like</button><br/>
          {blog.user}
          <button style={ delStyle } onClick={delBlog}>remove</button>
        </div>
      </div>
    )
  }
}

export default Blog
