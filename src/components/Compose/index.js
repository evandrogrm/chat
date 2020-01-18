import React, { useState } from 'react';
import './Compose.css';

export default function Compose(props) {
  const [message, setMessage] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setMessage('');
    props.onMessageSent(message);
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />

        {props.rightItems}
      </div>
    </form>
  );
}
