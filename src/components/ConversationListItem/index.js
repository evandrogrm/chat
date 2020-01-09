import React, { useEffect } from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem({
  channelSelected,
  data,
  changeChannel,
}) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  });

  const { photo, name, text, id } = data;

  return (
    <div
      className={`conversation-list-item ${
        channelSelected.id === id ? 'selected' : ''
      }`}
      onClick={() => changeChannel(id)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  );
}
