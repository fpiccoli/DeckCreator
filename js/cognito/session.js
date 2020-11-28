const AWS = require('aws-sdk/global');
const cognitoUser = require('./user.js');

module.exports = { getSessionStorage, refresh, signOut }

function getSessionStorage(){
  var cognitoUserObj = cognitoUser.getCognitoUser();

  return new Promise((resolve, reject) => {
    if (!cognitoUserObj) reject({code: 'NotAuthorizedException'});
    cognitoUserObj.getSession(function(err, session) {
      if (err) reject(err);
      resolve({cognitoUser: cognitoUserObj, session: session});
    });
  });
}

function refresh(cognitoUserObj, session){
  return new Promise((resolve, reject) => {
    cognitoUserObj.refreshSession(session.getRefreshToken(), (err, newSession) => {
      if (err) reject(err);

      let idToken = newSession.getIdToken().getJwtToken();
      let refreshToken = newSession.getRefreshToken().getToken();

      AWS.config.region = cognitoUser.getRegion();
      AWS.config.credentials.params = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: cognitoUser.getIdentityPoolId(),
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_cIJHtSy5H': idToken,
        },
      });
      AWS.config.credentials.refresh(err => {
        if (err) reject(err)
        getAttribute(cognitoUserObj, "custom:game").then(game => {
          resolve({user: cognitoUserObj.getUsername(), game:game, idToken: idToken, refreshToken: refreshToken});
        });
      });
    });
  });
}

function signOut(user){
  cognitoUser.getCognitoUser(user).signOut();
}

function getAttribute(cognitoUserObj, atr){
  return new Promise((resolve, reject) => {
    cognitoUserObj.getUserAttributes(function(err, attributes) {
      if (err) reject(err)
      let retorno = attributes.find(function (o) {return o.Name == atr});
      resolve(retorno.Value);
    });
  });
}
