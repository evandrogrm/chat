import Immutable from 'seamless-immutable';

/**
 * Types
 */
export const Types = {
  GET_USER_DETAILS_REQUEST: 'graph/GET_USER_DETAILS_REQUEST',
  GET_USER_DETAILS_SUCCESS: 'graph/GET_USER_DETAILS_SUCCESS',
  GET_TEAMS_REQUEST: 'graph/GET_TEAMS_REQUEST',
  GET_TEAMS_SUCCESS: 'graph/GET_TEAMS_SUCCESS',
  GET_CHANNELS_REQUEST: 'graph/GET_CHANNELS_REQUEST',
  GET_CHANNELS_SUCCESS: 'graph/GET_CHANNELS_SUCCESS',
  GET_MESSAGES_REQUEST: 'graph/GET_MESSAGES_REQUEST',
  GET_MESSAGES_SUCCESS: 'graph/GET_MESSAGES_SUCCESS',
  SET_CHANNEL: 'graph/SET_CHANNEL',
};

/**
 * Reducer
 */
const INITIAL_STATE = Immutable({
  userDetails: {},
  teams: [],
  channels: [],
  messages: [],
  teamSelected: {},
  channelSelected: {},
  loading: false,
});

export default function graph(state = INITIAL_STATE, action) {
  // console.log('duck state: ', state);
  // console.log('duck action: ', action);
  switch (action.type) {
    case Types.GET_USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload.userDetails,
        loading: false,
      };
    case Types.GET_TEAMS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload.teams,
        loading: false,
      };
    case Types.GET_CHANNELS_REQUEST:
      return { ...state, loading: true };
    case Types.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload.channels,
        loading: false,
      };
    case Types.GET_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case Types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
        loading: false,
      };
    case Types.SET_CHANNEL:
      return {
        ...state,
        channelSelected: action.payload.channelSelected,
        loading: false,
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  // UserDetails
  getUserDetailsRequest: () => ({
    type: Types.GET_USER_DETAILS_REQUEST,
  }),
  getUserDetailsSuccess: userDetails => ({
    type: Types.GET_USER_DETAILS_SUCCESS,
    payload: { userDetails },
  }),
  // Teams
  getTeamsRequest: () => ({
    type: Types.GET_TEAMS_REQUEST,
  }),
  getTeamsSuccess: teams => ({
    type: Types.GET_TEAMS_SUCCESS,
    payload: { teams },
  }),
  // Channels
  getChannelsRequest: groupId => ({
    type: Types.GET_CHANNELS_REQUEST,
    payload: { groupId },
  }),
  getChannelsSuccess: channels => ({
    type: Types.GET_CHANNELS_SUCCESS,
    payload: { channels },
  }),
  // Messages
  getMessagesRequest: (groupId, channelId) => ({
    type: Types.GET_MESSAGES_REQUEST,
    payload: { groupId, channelId },
  }),
  getMessagesSuccess: messages => ({
    type: Types.GET_MESSAGES_SUCCESS,
    payload: { messages },
  }),
  // ChannelSelected
  setChannelSelected: channelSelected => ({
    type: Types.SET_CHANNEL,
    payload: { channelSelected },
  }),
};
