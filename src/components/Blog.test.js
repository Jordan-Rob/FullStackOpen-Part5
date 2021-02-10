import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

test('by default blog only renders blog title and author', () => {
    const blog = {
        title: 'testin in react',
        author: 'Jay',
        url: 'salien.io',
        likes: 12
    }

    const del = jest.fn()
    const addlike = jest.fn()

    const component = render(
        <Blog blog={blog} addLike={del} delBlog={addlike} />
    )
    const element = component.container.querySelector('.default')
    expect(element).toHaveTextContent('testin in react')
    expect(element).toHaveTextContent('Jay')
    expect(element).not.toHaveTextContent('salien.io')
    expect(element).not.toHaveTextContent(12)
    

})