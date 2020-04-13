const { Client } = require('pg');

function createNewUser(username, password){
  const client = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})
  client.connect();
  return client.query("INSERT INTO users (username, email, password) VALUES ($1, $1, $2) RETURNING username", [username, password])
  .then(result => {
    client.end();
    return result;
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

module.exports = createNewUser;
