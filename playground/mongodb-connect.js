const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to Connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')
    // // Todos table and add data
    // db.collection('Todos').insertOne({
    //     text: 'Something do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert todo`, err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // })

    // create User table and add data
    // db.collection('Users').insertOne({
    //     name: 'Rohan',
    //     age: 22,
    //     location: "Chandigarh"
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to add user data`, err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id);  // get _id
    //     console.log(result.ops[0]._id.getTimestamp()); // timestamp


    // })



    client.close();
});