var env = process.env.NODE_ENV || 'development';
console.log(`env *********${env}`);

if(env === 'test'||env ==='development'){
    var config = require('./config.json'); // get whole json value
   
    var envConfig = config[env];    // get particular object either test or development
   
    Object.keys(envConfig).forEach((key)=>{    // assign key-value pair of particular object
    process.env[key] = envConfig[key];
   
    });

}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env == 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }