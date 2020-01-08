import React, { useEffect, useState } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import services from '../../services';

import graph from '../../graph';

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getLoggedUserId = () => {
    if (!!props.loggedUser) {
      return props.loggedUser.id;
    }
    return '';
  }

  const getGroupId = async () => {
    if (!!props.groupSelected) {
      return props.groupSelected.id;
    }
    console.log('props.groupSelected null');
    return '2da5fce3-2b33-4155-8f7d-9f8a4ff7a9aa';
  };

  const getMessages = async () => {
    console.log('props MessageList: ', props);
    const provider = props.provider;
    // const groupId = '2da5fce3-2b33-4155-8f7d-9f8a4ff7a9aa';
    const groupId = await getGroupId();
    const channelId = '19:bb339dbaa8b7402ea7f99f6370e2ace0@thread.skype';

    // if (props.groupId && props.channelId) {
    // let newMessages = await graph.getMessages(provider.graph.client, props.groupId, props.channelId);
    const newMessages = await graph.getMessages(
      provider.graph.client,
      groupId,
      channelId
    );
    let tempMessages = newMessages.value.map(m => ({
      id: m.id,
      userId: m.from.user.id,
      body: m.body,
      timestamp: moment(m.createdDateTime)
        .toDate()
        .getTime(),
      createdDateTime: m.createdDateTime,
    }));
    tempMessages = services.sortArray(tempMessages, 'createdDateTime');

    setMessages([...messages, ...tempMessages]);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.userId === getLoggedUserId();
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        rightItems={[
          <ToolbarButton
            key="info"
            icon="ion-ios-information-circle-outline"
          />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />,
        ]}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <Compose
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
      />
    </div>
  );
}
