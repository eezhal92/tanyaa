import { fireEvent, render, screen } from '@testing-library/react';
import { http, delay, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import ProfilePage from './ProfilePage'

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users/1', async () => {
    await delay(150)
    return HttpResponse.json({
      "id": 1,
      "name": "John Smith",
      "username": "johns",
    })
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('ProfilePage', () => {
  it('render todo', async () => {
    render(<ProfilePage />)
    // should show no user initially, and not be fetching a user
    expect(screen.getByText(/no user/i)).toBeInTheDocument()
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

    // after clicking the 'Fetch user' button, it should now show that it is fetching the user
    fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
    expect(screen.getByText(/no user/i)).toBeInTheDocument()

    // after some time, the user should be received
    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument()
    expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
  });
});
