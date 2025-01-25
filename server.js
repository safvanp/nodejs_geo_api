var file_handler = require('./fileHandler');
var reportData = require('./dataHandler');
var dataAll = require('./data_base');

var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get', (req, res) => {
    res.json(dataBase);
});

app.get('/getUsers', function (req, res) {
    const id = req.query.id;
    let result = dataBase.find((company) => company.id == id);
    if (!result) {
        res.status(404).json({ error: 'Users not found' });
    } else {
        result = result.users;
        res.json(result);
    }
});

app.get('/getUser', function (req, res) {
    const id = req.query.id;
    const name = req.query.name;
    let item = dataBase.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: 'User not found' });
  } else {
    let result = item.users.find((value) => value.name==name);
    res.json(result);
  }
});

app.post('/addUser', (req, res) => {
    const id = req.query.id;
    const newItem = req.body;
    let item = dataBase.find((item) => item.id === id);
    if (!item) {
        res.status(404).json({ error: 'User not found' });
    } else {
        item.users.push(newItem);
        res.status(200).json(newItem);
    }
});

app.put('/updateUser', (req, res) => {
    const newData = req.body;
    const id = req.query.id;
    const name = req.query.name;
    let item = dataBase.find((item) => item.id === id);
    if (!item) {
        res.status(404).json({ error: 'User not found' });
    } else {
        for (var j = 0; j < item.users.length; j++) {
            if(item.users[j].name== name){
                item.users[j] = newData;
                break;
            }
        }  
        res.status(200).json({ error: '' });
    }
});
app.get('/refreshUser', (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    let item = dataBase.find((item) => item.id === id);
    if (!item) {
        res.status(404).json({ error: 'User not found' });
    } else {
        for (var j = 0; j < item.users.length; j++) {
            if(item.users[j].name== name){
                item.users[j] = {
                    "name": item.users[j].name,
                    "location": []};
                break;
            }
        }  
        res.status(200).json({ error: '' });
    }
});

app.get('/refreshUsers', (req, res) => {
    const id = req.query.id;
    let item = dataBase.find((item) => item.id === id);
    if (!item) {
        res.status(404).json({ error: 'User not found' });
    } else {
        for (var j = 0; j < item.users.length; j++) {
            item.users[j] = {
                    "name": item.users[j].name,
                    "location": []};
        }  
        res.status(200).json({ error: '' });
    }
});

app.post('/addCompany', (req, res) => {
    const newItem = req.body;
    dataBase.push(newItem);
    res.status(201).json(newItem);
});

app.delete('/deleteCompany', (req, res) => {
    const id = parseInt(req.query.id);
    const index = dataBase.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      const deletedItem = dataBase.splice(index, 1);
      res.json(deletedItem[0]);
    }
});

// app.get('/get', function (req, res) {
//     let dictionaries = file_handler.readJsonFromFile("data.json");
//     res.send(dictionaries);
// });

// app.get('/getUsers', function (req, res) {
//     let result = reportData.getUsers(file_handler.readJsonFromFile("data.json"), req.query.id);
//     res.send(result);
// });

// app.get('/getUser', function (req, res) {
//     let result = reportData.getUser(file_handler.readJsonFromFile("data.json"), req.query.id, req.query.name);
//     res.send(result);
// });

// app.post('/addUser', function (req, res) {
//     let usersData = reportData.addUser(file_handler.readJsonFromFile("data.json"), req.query.id, req.body);
//     let result  = file_handler.writeFile(usersData);
//     res.send(result);
// });

// app.put('/updateUser', function (req, res) {
//     let result = reportData.updateUser(file_handler.readJsonFromFile("data.json"), req.query.id, req.body);
//     res.send(result);
// });

// app.post('/write', function(req, res) {
//     let result  = file_handler.writeFile(req.body);
//     console.log(result);
// })

const port = process.env.PORT || 8218
var server = app.listen(port, function () {
    console.log("Server is up on : " + port);
});

// In-memory data store (replace with a database in production)
const dataBase = [
    {
        id: '1234', users: [
            {
                name: "sales1",
                location: []
            }
        ],
    },{
        id: '12345', users: [
            {
                name: "COMPANY1",
                location: []
            },
            {
                name: "USER1",
                location: []
            }
        ],
    }
];