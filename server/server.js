const express = require('express')
const app = express()

const port = process.env.PORT || 4000;

app.get("*", function(request, result){
  result.send("Welcome on the api")
})

app.listen(port, function () {
  console.log("Server http listening on port:" + port);
});
