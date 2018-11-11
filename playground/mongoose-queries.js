const { ObjectId } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/Todo')

var id = '5be71a844799d611748a792f';

if (!ObjectId.isValid(id)) {
    console.log('ID not valid');
} else {
    console.log('ID valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    if (todos.length > 0) {
        console.log('todos: ', todos);
    } else {
        console.log('no data found');
    }
}, (err) => {
    console.log('unable to find ', err);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    if (todo!=null) {
        console.log('todo: ', todo);
    }
    else {
        console.log('no data found');
    }

}, (err) => {
    console.log('unable to find ', err);
});

Todo.findById(id).then((todo) => {
    if (todo!=null) {
        console.log('todo: ', todo);
    }
    else {
        console.log('no data found');
    }
}, (err) => {
    console.log('unable to find ', err);
});