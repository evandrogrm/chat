import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';

import { Creators as GraphActions } from '../../store/ducks/graph';

export default function Messenger() {
  const { loggedUser, teams, channels, channelSelected } = useSelector(
    state => ({
      loggedUser: state.graph.userDetails,
      teams: state.graph.teams,
      channels: state.graph.channels,
      teamSelected: state.graph.teamSelected,
      channelSelected: state.graph.channelSelected,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_LOG === 'true')
      console.log('ENTERED useEffect [] on Messenger');

    if (!loggedUser || !('id' in loggedUser)) {
      dispatch(GraphActions.getUserDetailsRequest());
    }
  }, []);

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_LOG === 'true')
      console.log('loggedUser in Messenger changed to:', loggedUser);

    if (loggedUser && 'id' in loggedUser) {
      dispatch(GraphActions.getTeamsRequest());
    }
  }, [loggedUser]);

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_LOG === 'true')
      console.log('teams in Messenger changed to:', teams);

    if (Array.isArray(teams)) {
      teams.map(team => dispatch(GraphActions.getChannelsRequest(team.id)));
    }
  }, [teams]);

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_LOG === 'true')
      console.log('channels in Messenger changed to:', channels);

    if (Array.isArray(channels) && (!channelSelected || !channelSelected.id)) {
      dispatch(GraphActions.setChannelSelected(channels[0]));
    }
  }, [channels]);

  useEffect(() => {
    if (process.env.REACT_APP_SHOW_LOG === 'true')
      console.log('channelSelected in Messenger changed to:', channelSelected);
  }, [channelSelected]);

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}
