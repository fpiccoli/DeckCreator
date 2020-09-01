const { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');
const cognitoUser = require('./user.js');

module.exports = { register, authenticate, resendConfirmation }

function register(user, email, pass){
  let userPool = new CognitoUserPool(cognitoUser.getPoolData());
  let attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: email });
  let atributeGame = new CognitoUserAttribute({ Name: 'custom:game', Value: 'MRBC' });

  return new Promise((resolve, reject) => {
    userPool.signUp(user, pass, [attributeEmail, atributeGame], null, function(err, result) {
      if (err) reject(err);
      else resolve(result.user);
    });
  });
}

function authenticate(user, pass){
  var authenticationDetails = new AuthenticationDetails({ Username: user, Password: pass });
  return new Promise((resolve, reject) => {
    cognitoUser.newCognitoUser(user).authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        var idToken = result.getIdToken().getJwtToken();
        var refreshToken = result.getRefreshToken().getToken();

        AWS.config.region = cognitoUser.getRegion();
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: cognitoUser.getIdentityPoolId(),
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

function resendConfirmation(user){
  return new Promise((resolve, reject) => {
    cognitoUser.newCognitoUser(user).resendConfirmationCode(function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}
