const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to Connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    // delete many - it will delete all data according to condition
    // db.collection('Todos').deleteMany({text:'new data'}).then((result)=>{
    //     console.log(result)
    // })

    // delete one - it will delete only one data
    // db.collection('Users').deleteOne({name:'Rohan'}).then((result)=>{
    //     console.log(result)
    // })

    //findOneAndDelete - it will delete one and return deleted data best for delete with id
    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5be5dea333d8d9b002080a53') }).then((result) => {
        console.log(result) // result will return the delete data 
    })


    client.close();
});