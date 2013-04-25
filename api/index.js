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
var users;

//Open a MongoDB connection
client.open(function(err) {
    if (err) throw err;
    client.collection('expense', function(err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries on expenses.');
        expenses = collection;
    });
    client.collection('user', function(err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries on expenses.');
        users = collection;
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

function expenseAdd(req, res, next) {

    console.log("Adding expense");

    console.log('Body: ' + req.body);

    var expenseItem = req.body;

    // Add expense item to DB
    expenseItem.dateTime = new Date(expenseItem.dateTime);
    console.log(expenseItem);
    expenses.insert(
        expenseItem,
        {safe: true},
        function(err, documents) {
            if (err) throw err;
            console.log('Expense id is: ' + documents[0]._id)
            res.send(documents[0]);
        }
    );

}

function expenseGet(req, res, next) {

    var expenseItem = {};

    // Retrieve the id
    var expenseId = req.params.id;
    console.log('Getting expense with id: ' + expenseId);

    //var _id = new client.bson_serializer.ObjectId(expenseId);

    var _id = new mongodb.ObjectID(expenseId);
    console.log('Object id: ' + _id);
    expenses.findOne({_id: _id},
        function(err, document) {
            if (err) throw err;
            console.log('Retrieved document: ' + document);
            res.send(document);
        }
    );

}

function expenseSave(req, res, next) {

    console.log("Saving expense");

    console.log('Body: ' + req.body);

    var expenseItem = req.body;

    // Retrieve the id
    var expenseId = req.params.id;
    console.log('Updating expense with id: ' + expenseId);
    var _id = new mongodb.ObjectID(expenseId);
    console.log('Object id: ' + _id);

    // Save expense item to DB
    expenseItem.dateTime = new Date(expenseItem.dateTime);
    expenseItem._id = _id;
    console.log(expenseItem);
    expenses.update(
        {_id: _id},
        expenseItem,
        {safe: true},
        function(err, document) {
            if (err) throw err;
            console.log("Expense saved successfully");
            //console.log(document);
            res.send(200);
        }
    );

}

function expenseRemove(req, res, next) {

    // Retrieve the id
    var expenseId = req.params.id;
    console.log('Removing expense with id: ' + expenseId);
    var _id = new mongodb.ObjectID(expenseId);
    console.log('Object id: ' + _id);

    // Remove expense item from DB
    expenses.remove(
        {_id: _id},
        {safe: true},
        function(err, noOfDocsDeleted) {
            if (err) throw err;
            console.log("Removed documents: " + noOfDocsDeleted);
            res.send(200);
        }
    );

}

function userGet(req, res, next) {

    // Retrieve the id
    var userId = req.params.id;
    console.log('Getting user with id: ' + userId);

    // Return the user document (exclusde password)
    users.findOne({_id: userId}, {password: 0},
        function(err, document) {
            if (err) throw err;
            console.log('Retrieved user: ' + document);
            res.send(document);
        }
    );

}

exports.testApi = testApi;
exports.expenseList = expenseList;
exports.expenseAdd = expenseAdd;
exports.expenseGet = expenseGet;
exports.expenseSave = expenseSave;
exports.expenseRemove = expenseRemove;
exports.userGet = userGet;

