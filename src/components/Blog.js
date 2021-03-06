import React, {useState} from 'react'
import PropType from 'prop-types'

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
    <div id="short" style={blogStyle} className='default'>
      <div style={ hideWhenVisible }>
        {blog.title} {blog.author} <button id="view" onClick={() => setVisible(true)}>view</button>
      </div>
    </div>
  )}
  else if(visible === true){
    return (
      <div id="long" style={blogStyle} className='onToggle'>
        <div style={ showWhenVisible }>
          {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes} <button id="like" onClick={addLike}>like</button><br/>
          {blog.user}
          <button id="remove" style={ delStyle } onClick={delBlog}>remove</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog:PropType.object.isRequired,
  addLike:PropType.func.isRequired,
  delBlog:PropType.func.isRequired
}

export default Blog
