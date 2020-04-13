const { Client } = require('pg');

function getUserByUsername(username){
  const client = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
  client.connect();
  return client.query("SELECT * FROM users WHERE username = $1", [username])
  .then(result => {
    client.end();
    return result.rows;
  })
  .catch(error => {
    console.warn(error);
    client.end();
    return({
      code: "400",
      text: "KO " + error
    });
  });
}

module.exports = getUserByUsername;
