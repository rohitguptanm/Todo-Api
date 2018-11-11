const { ObjectId } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/Todo')

var id = '5be71a844799d611748a792f';

if (!ObjectId.isValid(id)) {
    console.log('ID not valid');
} else {
    console.log('ID valid');
}
// without condition it will delete all data of Todo table
Todo.remove({}).then((result) => {
    console.log(result);
})

// Todo.findOneAndRemove({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// })

// Todo.findByIdAndRemove(id).then((todo) => {
//     console.log(todo);
// })