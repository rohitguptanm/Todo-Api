require('./config/config')

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { Users } = require('./models/Users');
var { authenticate } = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

// middleware
app.use(bodyParser.json());

// post add todo
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        _creator: req.user._id

    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// get todo list
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.send(400).send(e);
    });
});

// get individual id detail
app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo });
    }, (err) => {
        res.status(400).send()
    });
});

// delete by id
app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })
})

// update data
app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    })
})

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new Users(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

// POST /users/me
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email,password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    Users.findByCredential(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

// logout
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// for testing purpose used it
module.exports = { app };