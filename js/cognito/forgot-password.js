const AWS = require('aws-sdk/global');
const cognitoUser = require('./user.js');

module.exports = { forgotPassword, confirmPassword }

function forgotPassword(user){
  return new Promise((resolve, reject) => {
    cognitoUser.newCognitoUser(user).forgotPassword({
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
    cognitoUser.newCognitoUser(user).confirmPassword(code, newPassword, {
      onSuccess: function() {
        resolve(true);
      },
      onFailure: function(err) {
        reject(err)
      }
    });
  });
}
