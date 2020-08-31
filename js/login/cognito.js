const userPoolId = 'us-east-1_cIJHtSy5H';
const region = 'us-east-1';
const clientId = '68rl17jbudn16a49bssgpvihav';
const identityPoolId = 'us-east-1:3b46a63f-6df5-4818-8553-56e7e4e6049d';
const poolData = { UserPoolId: userPoolId, ClientId: clientId };

const { CognitoUserPool, CognitoUserAttribute, CognitoUser, CognitoUserSession, AuthenticationDetails, CognitoRefreshToken  } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');

module.exports = { register, authenticate, resendConfirmation, refresh, forgotPassword, confirmPassword, getSessionStorage, signOut }

function register(user, email, pass){
  let userPool = new CognitoUserPool(poolData);
  let attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: email });
  let atributeGame = new CognitoUserAttribute({ Name: 'custom:game', Value: 'MRBC' });

  return new Promise((resolve, reject) => {
    userPool.signUp(user, pass, [attributeEmail, atributeGame], null, function(err, result) {
      if (err) reject(err);
      else resolve(result.user);
    });
  });
}

function resendConfirmation(user){
  return new Promise((resolve, reject) => {
    newCognitoUser(user).resendConfirmationCode(function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function authenticate(user, pass){
  var authenticationDetails = new AuthenticationDetails({ Username: user, Password: pass });
  return new Promise((resolve, reject) => {
    newCognitoUser(user).authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        var idToken = result.getIdToken().getJwtToken();
        var refreshToken = result.getRefreshToken().getToken();

        AWS.config.region = region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId,
          Logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_cIJHtSy5H': idToken,
          },
        });

        AWS.config.credentials.refresh(error => {
          if (error) {
            reject(error);
          } else {
            resolve({idToken: idToken, refreshToken: refreshToken});
          }
        });
      },
      onFailure: function(err) {
        reject(err);
      }
    });
  });
}

function changePassword(user, oldPassword, newPassword){
  return new Promise((resolve, reject) => {
    newCognitoUser(user).changePassword(oldPassword, newPassword, function(err, result) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}

function forgotPassword(user){
  return new Promise((resolve, reject) => {
    newCognitoUser(user).forgotPassword({
      onSuccess: function(data) {
        resolve(data);
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      }
    });
  });
}

function confirmPassword(user, code, newPassword){
  return new Promise((resolve, reject) => {
    getCognitoUser().confirmPassword(code, newPassword, {
      onSuccess: function() {
        resolve(true);
      },
      onFailure: function(err) {
        reject(err)
      }
    });
  });
}

function signOut(user){
  getCognitoUser(user).signOut();
}


function getAttribute(cognitoUser, atr){
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes(function(err, attributes) {
      if (err) reject(err)
      let retorno = attributes.find(function (o) {return o.Name == atr});
      resolve(retorno.Value);
    });
  });
}


function getSessionStorage(){
  var cognitoUser = getCognitoUser();

  return new Promise((resolve, reject) => {
    if (!cognitoUser) reject({code: 'NotAuthorizedException'});
    cognitoUser.getSession(function(err, session) {
      if (err) reject(err);
      resolve({cognitoUser: cognitoUser, session: session});
    });
  });
}

function refresh(cognitoUser, session){
  return new Promise((resolve, reject) => {
    cognitoUser.refreshSession(session.getRefreshToken(), (err, newSession) => {
      if (err) reject(err);

      let idToken = newSession.getIdToken().getJwtToken();
      let refreshToken = newSession.getRefreshToken().getToken();

      AWS.config.region = region;
      AWS.config.credentials.params = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
        Logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_cIJHtSy5H': idToken,
        },
      });
      AWS.config.credentials.refresh(err => {
        if (err) reject(err)
        getAttribute(cognitoUser, "custom:game").then(game => {
          resolve({user: cognitoUser.getUsername(), game:game, idToken: idToken, refreshToken: refreshToken});
        });
      });
    });
  });
}



function newCognitoUser(user){
  let userPool = new CognitoUserPool(poolData);
  return new CognitoUser({ Username: user, Pool: userPool });
}

function getCognitoUser(){
  let userPool = new CognitoUserPool(poolData);
  return userPool.getCurrentUser();
}
