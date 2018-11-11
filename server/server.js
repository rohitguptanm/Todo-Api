require('./config/config')

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { Users } = require('./models/Users');

var app = express();

const port = process.env.PORT;

// middleware
app.use(bodyParser.json());

// post add todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// get todo list
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.send(400).send(e);
    });
});

// get individual id detail
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo });
    }, (err) => {
        res.status(400).send()
    });
});

// delete by id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })
})

// update data
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })


})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// for testing purpose used it
module.exports = { app };