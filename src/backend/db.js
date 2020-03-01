let mongoose = require( 'mongoose' );

mongoose.connect('mongodb+srv://petergarvin1:3nv1ronm3nT1@cluster0-tsvuh.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});