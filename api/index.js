/**
 * Created with JetBrains WebStorm.
 * User: clarence
 * Date: 2013/04/12
 * Time: 13:38
 */

//var contacts = [
//    {firstName: 'Clarence', lastName: 'Ho'},
//    {firstName: 'Andy', lastName: 'Lau'},
//    {firstName: 'Micheal', lastName: 'Jackson'}
//];

var mongodb = require('mongodb')
    , server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('test', server);
var contacts;

// Open a MongoDB connection
client.open(function(err) {
    if (err) throw err;
    client.collection('contacts', function(err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries on contacts.');
        contacts = collection;
    });
});

function testApi(req, res, next) {

    switch (req.method) {

        case 'GET':
            contacts.find({}).toArray(function(err, results) {
                res.send(results);
            });
            break;

    }

}

exports.testApi = testApi;
