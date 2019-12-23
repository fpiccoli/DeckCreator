require('../../config/mongo.js')('Code');
var mongoose = require('mongoose');
const Code = require('../../models/codigo.js');

module.exports = {
  save(obj){
    var query = {email: obj.email};
    return Code.findOneAndUpdate(query, obj, {upsert: true, useFindAndModify: false,  setDefaultsOnInsert: true}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  }
}
