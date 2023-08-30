import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import Togglable from '../components/Togglable';

describe('<Blog />', () => {
    const blog = {
        title: `Blog's title is short`,
        author: `Blog's author exists`
    }

    test('blog renders title and author', () => {

        const { container } = render(<Blog blog={blog} />)

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            `Blog's title is short Blog's author exists`
        )
    })

    test('clicking the like button calls click Handler twice', async () => {

        const mockLikes = jest.fn();
        const userObj = {name: 'Lena'};

        const { container } = render(
            <Blog user={userObj} blog={blog} addLike={mockLikes} likesVisible={true} />
        )

        const user = userEvent.setup()
        const button = screen.getByText('Like')
        await user.dblClick(button);

        expect(mockLikes).toHaveBeenCalledTimes(2);
    })

})
describe('<Togglable />', () => {
    const blog = {
        URL: `Blog's URL is displayed`,
        likes: `Blog's likes displayed`
    }
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" >
                    URL, likes
                </div>
            </Togglable>
        ).container
    })

    test('renders its children', async () => {
        await screen.findAllByText('URL, likes')
    })

    test('children are blog URL and likes', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveTextContent('URL, likes')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')

    })


})

