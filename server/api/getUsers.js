const { Client } = require('pg');

function getUsers(){
  // const client = new Client({
  //   ssl: SSLValue
  // });
  const client = new Client()
  client.connect();
  return client.query("SELECT * FROM users")
  .then(result => {
    console.log("users received : ");
    console.log(result);
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

module.exports = getUsers;
