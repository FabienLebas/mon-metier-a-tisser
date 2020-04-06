// var records = [
//     { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
//   , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
// ];

const getUsers = require("./api/getUsers.js");
let records = [];
getUsers()
.then(result => {
  console.log("j'ai récupéré les users : ");
  console.log(result);
  records = result;
})

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

exports.findByUsername = function(username, cb) {
  console.log(`j'ai recu ${username}`);
  process.nextTick(function() {
    console.log("records : ");
    console.log(records);
    for (var i = 0, len = records.length; i < len; i++) {
      console.log(`j'en suis à ${i} ${records[i].username} a comparer avec ${username}`);
      var record = records[i];
      if (record.username === username) {
        console.log(`j'ai trouve ${record.username}`);
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
