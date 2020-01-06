module.exports = {
  clientId: process.env.REACT_APP_APP_ID,
  authPopupUrl: process.env.REACT_APP_REDIRECT_URI || '',
  scopes: process.env.REACT_APP_SCOPES.split(' '),
};