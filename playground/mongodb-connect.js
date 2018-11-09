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

    // get the data

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch data')
    // });

    // get the data with condition
    // db.collection('Todos').find({completed:false}).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch data')
    // });

    // get the data with id
    //  db.collection('Todos').find({_id: ObjectID('5be47d50752ce505a4c8300a')}).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch data')
    // });

    // get the count
    db.collection('Todos').find().count().then((count) => {
        console.log(`count is ${count}`)
    }, (err) => {
        console.log('unable to fetch data')
    })


    client.close();
});