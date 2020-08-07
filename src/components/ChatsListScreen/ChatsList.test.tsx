import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { mockApolloClient } from '../../test-helpers';
import ChatsList, { getChatsQuery } from './ChatsList';

describe('ChatsList', () => {
  afterEach(() => {
    cleanup();

    delete window.location;
    // eslint-disable-next-line no-native-reassign
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
      writable: true,
    });
  });

  it('renders fetched chats data', async () => {
    const client = mockApolloClient([
      {
        request: { query: getChatsQuery },
        result: {
          data: {
            chats: [
              {
                __typename: 'Chat',
                id: 1,
                name: 'Foo Bar',
                picture: 'https://localhost:4000/picture.jpg',
                lastMessage: {
                  __typename: 'Message',
                  id: 1,
                  content: 'Hello',
                  createdAt: new Date('1 Jan 2019 GMT'),
                },
              },
            ],
          },
        },
      },
    ]);

    const history = createBrowserHistory();
    console.log('history object 1', history.location);

    {
      const { getByTestId } = render(
        <ApolloProvider client={client}>
          <ChatsList history={history} />
        </ApolloProvider>
      );

      await waitFor(() => screen.getByTestId('name'));

      expect(getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(getByTestId('content')).toHaveTextContent('Hello');
      expect(getByTestId('date')).toHaveTextContent('11:00');
    }
  });

  it('should navigate to the target chat room on chat item click', async () => {
    const client = mockApolloClient([
      {
        request: { query: getChatsQuery },
        result: {
          data: {
            chats: [
              {
                __typename: 'Chat',
                id: 1,
                name: 'Foo Bar',
                picture: 'https://localhost:4000/picture.jpg',
                lastMessage: {
                  __typename: 'Message',
                  id: 1,
                  content: 'Hello',
                  createdAt: new Date('1 Jan 2019 GMT'),
                },
              },
            ],
          },
        },
      },
    ]);

    const history = createBrowserHistory();
    console.log('history object 2', history.location);

    {
      const { getByTestId } = render(
        <ApolloProvider client={client}>
          <ChatsList history={history} />
        </ApolloProvider>
      );

      await waitFor(() => screen.getByTestId('chat'));

      fireEvent.click(getByTestId('chat'));

      await waitFor(() => {
        expect(history.location.pathname).toEqual('/chats/1');
      });
    }
  });
});
