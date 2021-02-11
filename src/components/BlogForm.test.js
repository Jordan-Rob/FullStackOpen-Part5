import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent} from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls event handler', () => {
    const createBlog = jest.fn()

    const user = {
        username:'jona'
    }

    const component = render(
        <BlogForm createBlog={createBlog} user={user} />
    )


    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
        target: { value: 'testin react forms' }
    })
    fireEvent.change(author, {
        target: { value: 'react dev team' }
    })
    fireEvent.change(url, {
        target: { value: 'react.io' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testin react forms')

})