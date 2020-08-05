import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      data: {
        chats: [
          {
            id: 1,
            name: 'Foo Bar',
            picture: 'https://localhost:4000/picture.jpg',
            lastMessage: {
              id: 1,
              content: 'Hello',
              createdAt: new Date('1 Jan 2019 GMT'),
            },
          },
        ],
      },
    })
  );

  const { container, getByText } = render(<App />);

  await waitFor(() => container);

  const linkElement = getByText(/Whatsapp Clone/i);
  expect(linkElement).toBeInTheDocument();
});
