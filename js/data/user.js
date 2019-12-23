require('../../config/mongo.js')('User');
var mongoose = require('mongoose');
const User = require('../../models/user.js');

module.exports = {
  find(user, pass){
    return User.find({user: user.toLowerCase(), password: pass}).lean().then(function(retorno){
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
  }
}
