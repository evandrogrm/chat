import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import services from '../../services';

import { Creators as GraphActions } from '../../store/ducks/graph';

export default function MessageList({ provider }) {
  const [currentMessages, setCurrentMessages] = useState([]);
  const { loggedUser, teams, channelSelected, messages } = useSelector(
    state => ({
      loggedUser: state.graph.userDetails,
      teams: state.graph.teams,
      channelSelected: state.graph.channelSelected,
      messages: state.graph.messages,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    console.log('channelSelected in MessageList changed to:', channelSelected);
    if (!!channelSelected && !!channelSelected.id) {
      getMessages();
    }
  }, [channelSelected]);

  useEffect(() => {
    console.log('messages in MessageList changed to:', messages);
    let tempMessages = messages.map(m => ({
      id: m.id,
      userId: m.from.user.id,
      body: m.body,
      timestamp: moment(m.createdDateTime)
        .toDate()
        .getTime(),
      createdDateTime: m.createdDateTime,
    }));
    tempMessages = [...tempMessages];
    tempMessages = services.sortArray(tempMessages, 'createdDateTime');
    setCurrentMessages(tempMessages)
  }, [messages]);

  const getMessages = () => {
    const groupId = !!teams[0] ? teams[0].id : '';
    const channelId = !!channelSelected ? channelSelected.id : '';

    dispatch(GraphActions.getMessagesRequest(provider.graph.client, groupId, channelId));
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = currentMessages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = currentMessages[i - 1];
      let current = currentMessages[i];
      let next = currentMessages[i + 1];
      let isMine = current.userId === loggedUser.id;
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
