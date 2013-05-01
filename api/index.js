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

var bcrypt = require('dojo-bcrypt')
    , mongodb = require('mongodb')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
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

function expenseList(req, res, next) {

    var userId = '';

    if (req.user) {
        console.log('In expense list for user: ' + req.user.id);
        userId = req.user.id;
    } else {
        res.send(401);
    }

    switch (req.method) {

        case 'GET':
            expenses.find({userId: userId}).toArray(function(err, results) {
                res.send(results);
            });
            break;

    }

}

function expenseAdd(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

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

    if (!req.user) {
        res.send(401);
    }

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

    if (!req.user) {
        res.send(401);
    }

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

    if (!req.user) {
        res.send(401);
    }

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

    if (!req.user) {
        res.send(401);
    }

    // Retrieve the id
    var userId = req.params.id;
    if (userId !== req.user.id) {
        res.send(401);
    }
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

function findUserById(userId, callback) {

    // Return the user document (exclusde password)
    users.findOne({_id: userId},
        function(err, document) {
            if (err) throw err;
            //console.log('Retrieved user: ' + document);
            callback(document);
        }
    );

}

function userAdd(req, res, next) {

    var newUser = req.body;

    console.log('Adding user: ', newUser.username + ':' + newUser.password + ' name: ' + newUser.name);

    // Hash the password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(newUser.password, salt);

    var user = {
        _id: newUser.username,
        password: hashPassword,
        userName: newUser.name
    };

    // Add user to DB
    users.insert(
        user,
        {safe: true},
        function(err, documents) {
            if (err) {
                console.log('Error in adding user to DB: ' + err);
                res.send(500);
            };
            console.log('User: ' + newUser.username + ' registered successfully');

            // Login user
            console.log("Logging in user: " + newUser.username);
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.send(401);
                }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    res.send(200);
                });
            })(req, res, next);
        }
    );

}

function validPassword(userPassword, submittedPassword) {

    console.log('Hashed password: ' + userPassword + ' submitted password: ' + submittedPassword);
    console.log('Compare result: ' + bcrypt.compareSync(submittedPassword, userPassword));

    return bcrypt.compareSync(submittedPassword, userPassword);

}

function addCategoryForUser(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

    var user = req.user;

    var category = req.body;

    console.log('Add category: ' + category.category + ' for user: ' + user.id);

    // Save category to DB
    users.update(
        {_id: user.id},
        {$addToSet: {categories: category.category}},
        {safe: true},
        function(err, document) {
            if (err) throw err;
            console.log('Category saved successfully');
            res.send(200);
        }
    );

}

function checkUserId(req, res, next) {

    // Retrieve the id
    var userId = req.params.id;

    console.log('Checking existing user with id: ' + userId);

    // Return the user document (exclusde password)
    users.findOne({_id: userId}, {password: 0},
        function(err, document) {
            if (err) throw err;
            console.log('User id exist ' + document);
            if (!!document) {
                res.send(404);
            } else {
                res.send(200);
            }
        }
    );

}

function expenseReport(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

    var userId = req.user.id;

    var rptCriteria = req.body;

    console.log('Expense report for criteria - from date: ' + rptCriteria.fromDate + ' to date: ' + rptCriteria.toDate + ' group by: ' + rptCriteria.groupBy);


    // Retrieve expense report data from DB
    // Use MongoDB aggregation framework
    expenses.aggregate( [
        { $match : { userId : userId} },
        { $match : { dateTime : {$gte: new Date(rptCriteria.fromDate), $lte: new Date(rptCriteria.toDate)} } },
        { $group: { _id: '$' + rptCriteria.groupBy.toLowerCase(), total: { $sum: '$amount' } } }
    ], function(err, result) {
        if (err) {
            console.log('Error in adding user to DB: ' + err);
            res.send(500);
        };

        console.log('Expense report data retrieved successfully');
        res.send(result);

    });

}

exports.expenseList = expenseList;
exports.expenseAdd = expenseAdd;
exports.expenseGet = expenseGet;
exports.expenseSave = expenseSave;
exports.expenseRemove = expenseRemove;
exports.userGet = userGet;
exports.findUserById = findUserById;
exports.userAdd = userAdd;
exports.validPassword = validPassword;
exports.addCategoryForUser = addCategoryForUser;
exports.checkUserId = checkUserId;
exports.expenseReport = expenseReport;
