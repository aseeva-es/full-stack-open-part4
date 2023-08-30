import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

describe('<BlogForm/>', ()=>{
    test(' updates parent state and calls onSubmit', async () => {
        const onSubmit = jest.fn()
        const user = userEvent.setup()
      
        render(<BlogForm onSubmit={onSubmit} />)
      
        const inputs = screen.getAllByRole('textbox')
        // console.log('inputs', inputs)
        const sendButton = screen.getByText('Create')
      
        await user.type(inputs[0], 'changed')
        await user.click(sendButton)
        console.log('onSubmit', onSubmit.mock.calls)
      
        expect(onSubmit.mock.calls).toHaveLength(1);
        expect(onSubmit.mock.calls[0][0].title).toBe('changed')
      })
});




