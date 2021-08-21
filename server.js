const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const multiparty = require('multiparty');
require('dotenv').config()

const app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", (req, res) => {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    res.json({
      name: files.upfile[0].originalFilename,
      type: files.upfile[0].headers['content-type'],
      size: files.upfile[0].size
    })
  });  
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
