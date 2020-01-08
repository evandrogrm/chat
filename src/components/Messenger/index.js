import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import graph from '../../graph';
import provider from '../../CustomTeamsProvider';

export default class Messenger extends React.Component {
  state = {
    loggedUser: null,
    groupSelected: null,
    channelSelected: null,
  };

  async componentDidMount() {
    process.env[REACT_APP_PROVIDER_STATUS] = provider.status;
    this.setState({
      loggedUser: await graph.getUserDetails(provider.graph.client),
    });
  }

  selectGroup = groupSelected => {
    this.setState({ groupSelected });
  };

  selectChannel = channelSelected => {
    this.setState({ channelSelected });
  };

  render() {
    // console.log('Messenger state', this.state);
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            provider={provider}
            setGroupSelected={this.selectGroup}
            setChannelSelected={this.selectChannel}
            channelSelected={this.state.channelSelected}
          />
        </div>

        <div className="scrollable content">
          <MessageList
            provider={provider}
            loggedUser={this.state.loggedUser}
            groupSelected={this.state.groupSelected}
            channelSelected={this.state.channelSelected}
          />
        </div>
      </div>
    );
  }
}
