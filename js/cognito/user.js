const { CognitoUserPool, CognitoUser } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk/global');
const poolData = { UserPoolId: 'us-east-1_cIJHtSy5H', ClientId: '68rl17jbudn16a49bssgpvihav' };

module.exports = { newCognitoUser, getCognitoUser, getPoolData, getRegion, getIdentityPoolId }

function newCognitoUser(user){
  let userPool = new CognitoUserPool(poolData);
  return new CognitoUser({ Username: user, Pool: userPool });
}

function getCognitoUser(){
  let userPool = new CognitoUserPool(poolData);
  return userPool.getCurrentUser();
}

function getPoolData(){
  return poolData;
}

function getRegion(){
  return 'us-east-1';
}

function getIdentityPoolId(){
  return 'us-east-1:3b46a63f-6df5-4818-8553-56e7e4e6049d';
}
