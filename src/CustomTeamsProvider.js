import teamsConfig from "./TeamsConfig";
import * as MicrosoftTeams from "@microsoft/teams-js/dist/MicrosoftTeams";
import { TeamsProvider } from "@microsoft/mgt";
TeamsProvider.microsoftTeamsLib = MicrosoftTeams;
export default new TeamsProvider(teamsConfig);

// export default class CustomTeamsProvider {
//   #_provider;

//   get provider() {
//     if (!this._provider) {
//       console.log('!this.provider')
//       TeamsProvider.microsoftTeamsLib = MicrosoftTeams;
//       this._provider = new TeamsProvider(teamsConfig);
//       return this._provider;
//     }
//     return this._provider;
//   }

//   set provider(provider) {
//     this._provider = provider;
//   }
// }