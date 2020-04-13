const getUserByUsername = require("./api/getUserByUsername.js");
let records = [];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, callback){
  process.nextTick(function() {
    return getUserByUsername(username)
    .then(user => {
      if (user.length > 0){
        return callback(null, user[0]);
      } else return callback(null, null);
    })
  })
}
