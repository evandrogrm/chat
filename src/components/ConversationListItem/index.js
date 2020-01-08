import React, { useEffect, useState } from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    shave('.conversation-snippet', 20);
  });
  
  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const { photo, name, text, id } = props.data;

  return (
    <div
      className={`conversation-list-item ${selected ? 'selected' : ''}`}
      onClick={() => props.setChannelSelected(id)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  );
}
