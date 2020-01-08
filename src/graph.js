import 'isomorphic-fetch';

export default {
  getUserDetails: async function(client) {
    return client.api('/me').get();
  },

  getEvents: async function(client) {
    return client
      .api('/me/events')
      .select('subject,organizer,start,end')
      .orderby('createdDateTime DESC')
      .get();
  },

  getTeams: async function(client) {
    try {
      return await client.api('/me/joinedTeams').get();
    } catch (error) {
      console.error(error);
    }
  },

  getChannels: async function(client, groupId) {
    try {
      return await client.api(`/teams/${groupId}/channels`).get();
    } catch (error) {
      console.error(error);
    }
  },

  getMessages: async function(client, groupId, channelId) {
    try {
      return await client
        .api(`/teams/${groupId}/channels/${channelId}/messages`)
        .version('beta')
        .get();
    } catch (error) {
      console.error(error);
    }
  },
};
