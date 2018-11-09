const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to Connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp')

    // update data

    // db.collection('Todos').findOneAndUpdate({ completed: false },
    //     {
    //         $set: {
    //             text: 'Nothing done yet',
    //             completed:true
    //         }
    //     },
    //     {
    //         returnOriginal: false  // false then it will show updatedone
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // },(err)=>{
    //     console.log("unable to update")
    // })

    db.collection('Users').findOneAndUpdate({name:'Rohit Gupta'},{
        $set:{
            name:'Rohit'
        },
        $inc:{
             age:-2
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result)
    },(err)=>{
        console.log("unable to update")
    })


    client.close();
});