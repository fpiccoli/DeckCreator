const userPoolId = 'us-east-1_cIJHtSy5H';
const region = 'us-east-1';
const clientId = '68rl17jbudn16a49bssgpvihav';
const identityPoolId = 'us-east-1:3b46a63f-6df5-4818-8553-56e7e4e6049d';

const { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');

module.exports = { register, authenticate }

function register(user, email, pass){
  var poolData = {
    UserPoolId: userPoolId,
    ClientId: clientId
  };
  var userPool = new CognitoUserPool(poolData);

  var attributeEmail = new CognitoUserAttribute({ Name: 'email', Value: email });

  return new Promise((resolve, reject) => {
    userPool.signUp(user, pass, [attributeEmail], null, function(err, result) {
      if (err) {
        // if (err.code == 'UsernameExistsException'){
        //   resendConfirmation(user, userPool);
        //   .then((retorno) => {
        //     resolve(retorno)
        //   }).catch(err => reject(err));
        // }
        reject(err);
      }
      else resolve(result.user);
    });
  });
}

function resendConfirmation(user, userPool){
  var cognitoUser = new CognitoUser({ Username: user, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function authenticate(user, pass){
  var authenticationDetails = new AuthenticationDetails({ Username: user, Password: pass });
  var userPool = new CognitoUserPool({ UserPoolId: userPoolId, ClientId: clientId });
  var cognitoUser = new CognitoUser({ Username: user, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
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

function changePassword(){
  cognitoUser.changePassword('oldPassword', 'newPassword', function(err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    console.log('call result: ' + result);
  });
}

function forgotPassword(){
  cognitoUser.forgotPassword({
    onSuccess: function(data) {
      // successfully initiated reset password request
      console.log('CodeDeliveryData from forgotPassword: ' + data);
    },
    onFailure: function(err) {
      alert(err.message || JSON.stringify(err));
    },
    //Optional automatic callback
    inputVerificationCode: function(data) {
      console.log('Code sent to: ' + data);
      var code = document.getElementById('code').value;
      var newPassword = document.getElementById('new_password').value;
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
          console.log('Password confirmed!');
        },
        onFailure(err) {
          console.log('Password not confirmed!');
        },
      });
    },
  });
}

function signOut(){
  cognitoUser.signOut();
}

// refresh_token = session.getRefreshToken(); // receive session from calling cognitoUser.getSession()
// if (AWS.config.credentials.needsRefresh()) {
//     cognitoUser.refreshSession(refresh_token, (err, session) => {
//         if (err) {
//             console.log(err);
//         } else {
//             AWS.config.credentials.params.Logins[
//                 'cognito-idp.<YOUR-REGION>.amazonaws.com/<YOUR_USER_POOL_ID>'
//             ] = session.getIdToken().getJwtToken();
//             AWS.config.credentials.refresh(err => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log('TOKEN SUCCESSFULLY UPDATED');
//                 }
//             });
//         }
//     });
// }
