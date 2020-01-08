import React, { useState, useEffect } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import './ConversationList.css';
import graph from '../../graph';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [channelSelected, setChannelSelected] = useState({});

  useEffect(() => {
    getConversations();
  }, []);
  
  useEffect(() => {
    console.log('props ConversationList', props);
    setChannelSelected(props.channelSelected);
  }, [props.channelSelected]);

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
    let channelSelected = false;
    const provider = props.provider;
    const groups = await graph.getTeams(provider.graph.client);
    
    if (!!groups && !!groups.value && !!groups.value.length) {
      await props.setGroupSelected(groups.value[0]);
      
      await groups.value.map(async g => {
        const channels = await graph.getChannels(provider.graph.client, g.id);
        console.log('channels :', channels);
        
        if (!!channels.value && !!channels.value.length) {
          if (!channelSelected) {
            channelSelected = true;
            await props.setChannelSelected(channels.value[0]);
          }

          channelsArray = channelsArray.concat(channels.value);
          console.log('channelsArray: ', channelsArray);
          conversations = channelsArray.map(c =>  ({
            id: c.id,
            photo: `https://dummyimage.com/cga/${getRandomColor()}/ffffff&text=${c.displayName.charAt(0)}`,
            name: c.displayName,
            text:
              'Último texto da conversa que vai ser truncada caso exceda o tamanho',
          }));
          setConversations([...conversations]);
        }
      });
    }
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="Teams Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations.map(conversation => (
        <ConversationListItem
          key={conversation.id}
          data={conversation}
          setChannelSelected={props.setChannelSelected}
          selected={channelSelected.id === conversation.id}
        />
      ))}
    </div>
  );
}
