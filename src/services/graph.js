import 'isomorphic-fetch';
import provider from '../CustomTeamsProvider';

const client = provider.graph.client;

export default {
  isUserLogged: function() {
    console.log('provider: ', provider);
    return provider.state === 0;
  },

  getUserDetails: async function() {
    return client.api('/me').get();
  },

  // NOT YET USED
  // getEvents: async function(client) {
  //   return client
  //     .api('/me/events')
  //     .select('subject,organizer,start,end')
  //     .orderby('createdDateTime DESC')
  //     .get();
  // },

  getTeams: async function() {
    try {
      return await client.api('/me/joinedTeams').get();
    } catch (error) {
      console.error(error);
    }
  },

  getChannels: async function(groupId) {
    try {
      return await client.api(`/teams/${groupId}/channels`).get();
    } catch (error) {
      console.error(error);
    }
  },

  getMessages: async function(groupId, channelId) {
    try {
      return await client
        .api(`/teams/${groupId}/channels/${channelId}/messages`)
        .version('beta')
        .get();
    } catch (error) {
      console.error(error);
    }
  },

  getImage: async function(url) {
    try {
      if (url.includes('beta')) {
        return await client
          .api(url)
          .version('beta')
          .get();
      }
      return await client.api(url).get();
    } catch (error) {
      console.error(error);
    }
  },
};

export { provider };
