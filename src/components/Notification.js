import React from 'react';

const Notification = ({message}) => {
    if(message !== null && message.includes('Error')){
        return (
            <div className='error'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export default Notification