const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to Connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

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