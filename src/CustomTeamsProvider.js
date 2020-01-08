import teamsConfig from './TeamsConfig';
import * as MicrosoftTeams from '@microsoft/teams-js/dist/MicrosoftTeams';
import { TeamsProvider } from '@microsoft/mgt';
TeamsProvider.microsoftTeamsLib = MicrosoftTeams;
export default new TeamsProvider(teamsConfig);
