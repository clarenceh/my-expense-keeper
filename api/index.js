/**
 * Created with JetBrains WebStorm.
 * User: clarence
 * Date: 2013/04/12
 * Time: 13:38
 */

//var expenses = [
//    {userId: 'ho.clarence@gmail.com', dateTime: new Date(), location: 'Diamond Hill', category: 'Eat', amount: 300},
//    {userId: 'ho.clarence@gmail.com', dateTime: new Date(), location: 'Diamond Hill', category: 'Cloth', amount: 650}
//];

var mongodb = require('mongodb')
    , server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('myexpensekeeper', server);
var expenses;

//Open a MongoDB connection
client.open(function(err) {
    if (err) throw err;
    client.collection('expense', function(err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries on expenses.');
        expenses = collection;
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

function expenseList(req, res, next) {

    switch (req.method) {

        case 'GET':
            expenses.find({}).toArray(function(err, results) {
                res.send(results);
            });
            break;

    }

}

exports.testApi = testApi;
exports.expenseList = expenseList;

