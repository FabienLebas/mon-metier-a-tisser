const { Client } = require('pg');

function createCanvas(username, details, canvasName, defaultColor){
  const client = new Client({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  })
  client.connect();
  const now = new Date();
  return client.query("INSERT INTO canvas (username, created_at, details, name, default_color) VALUES ($1, $2, $3, $4, $5)",
    [username, now.toISOString(), details, canvasName, defaultColor])
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

module.exports = createCanvas;
