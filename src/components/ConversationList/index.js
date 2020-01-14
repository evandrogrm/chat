import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import LoginPage from '../LoginPage';
import '@microsoft/mgt/dist/es6/components/mgt-login/mgt-login.js';

import { Creators as GraphActions } from '../../store/ducks/graph';

export default function ConversationList() {
  const [conversations, setConversations] = useState([]);

  const { channels, channelSelected } = useSelector(state => ({
    channels: state.graph.channels,
    channelSelected: state.graph.channelSelected,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const conversations = channels.map(c => ({
      id: c.id,
      photo: `https://dummyimage.com/cga/${getRandomColor()}/ffffff&text=${c.displayName.charAt(
        0
      )}`,
      name: c.displayName,
      text:
        'Último texto da conversa que vai ser truncada caso exceda o tamanho',
    }));
    setConversations([...conversations]);
  }, [channels]);

  const changeChannel = id => {
    const channel = channels.filter(c => c.id === id)[0];
    if (channel != null) {
      dispatch(GraphActions.setChannelSelected(channel));
    }
  };

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="Teams Messenger"
        leftItems={[<LoginPage key="login" />]}
        // leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        }
      />
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem
          key={conversation.id}
          data={conversation}
          channelSelected={channelSelected}
          changeChannel={changeChannel}
        />
      ))}
    </div>
  );
}
