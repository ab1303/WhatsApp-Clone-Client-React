import React from 'react';
import { cleanup, render, getByTestId } from '@testing-library/react';
import MessagesList from './MessagesList';

describe('MessagesList', () => {
  afterEach(cleanup);

  const time = new Date('1 Jan 2019 GMT');

  it('renders messages data', () => {
    const messages = [
      {
        id: '1',
        content: 'foo',
        createdAt: time,
      },
      {
        id: '2',
        content: 'bar',
        createdAt: time,
      },
    ];

    let message1, message2;
    {
      const { getAllByTestId, getByTestId } = render(
        <MessagesList messages={messages} />
      );
      const match = getAllByTestId('message-item');
      message1 = match[0] as HTMLElement;
      message2 = match[1] as HTMLElement;
    }

    expect(getByTestId(message1, 'message-content')).toHaveTextContent('foo');
    expect(getByTestId(message1, 'message-date')).toHaveTextContent('11:00');

    expect(getByTestId(message2, 'message-content')).toHaveTextContent('bar');
    expect(getByTestId(message2, 'message-date')).toHaveTextContent('11:00');
  });
});
