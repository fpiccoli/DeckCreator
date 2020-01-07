require('../../config/mongo.js')('User');
var mongoose = require('mongoose');
const User = require('../../models/user.js');

module.exports = {
  login(user, pass){
    return User.find({user: user.toLowerCase(), password: pass}).lean().then(function(retorno){
      return retorno[0];
    },function(error){
      console.log(error);
    });
  },
  find(query){
    console.log(JSON.stringify(query));
    return User.find(query).lean().then(function(retorno){
      console.log(retorno);
      return retorno[0];
    },function(error){
      console.log(error);
    });
  },
  save(obj){
    var query = {user: obj.user, email: obj.email};
    return User.findOneAndUpdate(query, obj, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  activate(email){
    var obj = {email: email, active: true};
    return User.findOneAndUpdate({email: email}, obj, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  }
}
