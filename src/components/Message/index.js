import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
  showTimestamp,
  getImage,
}) {
  const friendlyTimestamp = moment(data.timestamp).format('LLLL');

  const getMessage = body => {
    if (body.contentType === 'text') {
      return body.content;
    }
    if (body.content.includes('<img')) {
      return <div>{getImage(body)}</div>;
    }
  };

  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {getMessage(data.body)}
        </div>
      </div>
    </div>
  );
}
