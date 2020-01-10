import React from 'react';
import moment from 'moment';
import './Message.css';
import graphService from '../../services/graph';

export default function Message({ data, isMine, startsSequence, endsSequence, showTimestamp }) {
  const friendlyTimestamp = moment(data.timestamp).format('LLLL');

  const getMessage = async body => {
    if (body.contentType === 'text') {
      return body.content;
    }
    if (body.content.includes('<img')) {
      const dom = document.createElement('div');
      dom.innerHTML = body.content;
      const img = dom.getElementsByTagName('img')[0];
      // for (let i = 0; i < imgs.length; i++) {
      //   const img = imgs[i];
      // }
      const url = img.getAttribute('src');
      const newSrc = graphService.getImage(url);
      const objectURL = URL.createObjectURL(newSrc);
      img.setAttribute('src', objectURL);
    }
    return <div dangerouslySetInnerHTML={{ __html: body.content }}></div>;
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
