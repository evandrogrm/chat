import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import CustomTeamsProvider from '../../CustomTeamsProvider';
import graph from '../../graph';
import provider from '../../CustomTeamsProvider';

export default class Messenger extends React.Component {
  state = {
    chatSelected: null,
  };

  async componentDidMount() {
    if (!provider.user) {
      provider.user = await graph.getUserDetails(provider.graph.client);
    }
  }

  selectChat = chatSelected => {
    this.setState({ chatSelected });
  };

  render() {
    console.log('provider Main :', provider);
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList provider={provider} setChatSelected={this.selectChat} />
        </div>

        <div className="scrollable content">
          <MessageList provider={provider} chatSelected={this.state.chatSelected} />
        </div>
      </div>
    );
  }
}
