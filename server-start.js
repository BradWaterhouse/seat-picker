const express = require('express');
const bodyParser = require('body-parser');

let fs = require('fs');

const app = express();

const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/save-json', (req, res) => {
    console.log(req.body);

    fs.writeFile(req.body.filename, JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
