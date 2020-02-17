const express = require('express');
const bodyParser = require('body-parser');

let fs = require('fs');

let cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/save-json', (req, res) => {
    console.log(req);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.json}`,
    );

    // fs.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
    //     if (err) throw err;
    //     console.log('File is created successfully.');
    // });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
