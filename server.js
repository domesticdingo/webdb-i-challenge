const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

//  V ENDPOINTS V

server.get('/', (req, res) => {
    res.send("It's alive!")
})

//Get all accounts
server.get('/accounts', (req, res) => {
    db('accounts')
    .then(acc => res.status(200).json(acc))
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error getting the accounts." })
    })
})

//Get account by ID
server.get('/accounts/:id', (req, res) => {
    const id = req.params.id;

    db('accounts').where({ id })
        .then(acc => res.status(200).json(acc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error getting the account by ID." })
        })
})

//Add new account
server.post('/accounts', (req, res) => {
    const acc = req.body;

    db('accounts').insert(acc)
        .then(acc => res.status(200).json(acc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error adding a new account." })
        })
})

//Update account information
server.put('/accounts/:id', (req, res) => {
    const acc = req.params.id;
    const update = req.body;

    db('accounts').where('id', acc).update(update)
        .then(acc => res.status(200).json(acc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error editing the account." })
        })
})

//Delete an account
server.delete('/accounts/:id', (req, res) => {
    const id = req.params.id;

    db('accounts').where('id', id).del()
        .then(acc => res.status(200).json(acc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error deleting the account." })
        })
})

module.exports = server;