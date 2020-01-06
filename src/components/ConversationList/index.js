import React, { useState, useEffect } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import graph from '../../graph';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getConversations();
  }, []);

  const getProvider = async () => {
    const provider = props.provider;
    if (!provider.user) {
      provider.user = await graph.getUserDetails(provider.graph.client);
    }
    return provider;
  };

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getConversations = async () => {
    let channelsArray = [];
    let conversations = [];
    const provider = await getProvider();
    const groups = await graph.getTeams(provider.graph.client);
    console.log('groups :', groups);
    await groups.value.map(async v => {
      const channels = await graph.getChannels(provider.graph.client, v.id);
      console.log('channels :', channels);
      channelsArray = channelsArray.concat(channels.value);
      console.log('channelsArray :', channelsArray);
      conversations = channelsArray.map(c =>  ({
        // photo: `https://dummyimage.com/cga/d4181f77/ffffff&text=${v.displayName.charAt(0)}`,
        photo: `https://dummyimage.com/cga/${getRandomColor()}/ffffff&text=${c.displayName.charAt(0)}`,
        name: c.displayName,
        text:
          'Último texto da conversa que vai ser truncada caso exceda o tamanho',
      }));
      setConversations([...conversations]);
    });
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="Teamsbook"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem
          key={conversation.name}
          data={conversation}
          setChatSelected={props.selectChat}
        />
      ))}
    </div>
  );
}
