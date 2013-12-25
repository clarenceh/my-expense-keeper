/**
 * Created with JetBrains WebStorm.
 * User: clarence
 * Date: 2013/04/12
 * Time: 13:38
 */
'use strict';

var env = process.env.NODE_ENV || 'development';

var dbHost = '';
var dbPort = 0;
var dbUserName = process.env.DB_USER_NAME || '';
var dbPassword = process.env.DB_PASSWORD || '';
var mailService = 'Gmail';
var mailServiceUser = process.env.MAIL_SERVICE_USER || '';
var mailServicePassword = process.env.MAIL_SERVICE_PASSWORD || '';
var baseURL = process.env.NODEJS_SERVER_BASE_URL || 'http://localhost:3000/#';

// Configure DB server for diff. envs
if ('development' === env) {
    dbHost = '127.0.0.1';
    dbPort = 27017;
} else if ('production' === env) {
    //dbHost = 'dawson.mongohq.com';
    //dbPort = 10096;
    dbHost = '127.0.0.1';
    dbPort = 27017;
}

var bcrypt = require('bcryptjs'),
    mongodb = require('mongodb'),
    passport = require('passport'),
    nodemailer = require('nodemailer'),
    uuid = require('node-uuid'),
    url = require('url'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy,
    server = new mongodb.Server(dbHost, dbPort, {});
var client = new mongodb.Db('myexpensekeeper', server);
var expenses;
var users;
var passwordResets;

//Open a MongoDB connection
client.open(function(err) {
    if (err) {
        throw err;
    }

    // If production, login to DB
    if ('production' === env) {
        client.authenticate(dbUserName, dbPassword, function authenticate(err, replies) {
            if (err) {
                throw err;
            }

            // You are now connected and authenticated.
        });
    }

    client.collection('expense', function(err, collection) {
        if (err) {
            throw err;
        }
        console.log('We are now able to perform queries on expenses.');
        expenses = collection;
    });
    client.collection('user', function(err, collection) {
        if (err) {
            throw err;
        }
        console.log('We are now able to perform queries on users.');
        users = collection;
    });
    client.collection('password_reset', function(err, collection) {
        if (err) {
            throw err;
        }
        console.log('We are now able to perform queries on password_reset.');
        passwordResets = collection;
    });
});

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport('SMTP',{
    service: mailService,
    auth: {
        user: mailServiceUser,
        pass: mailServicePassword
    }
});

function expenseList(req, res, next) {

    var userId = '';

    if (req.user) {
        console.log('In expense list for user: ' + req.user.id);
        userId = req.user.id;
    } else {
        res.send(401);
    }

    // Retrieve the past no. of days to query
    var days = req.params.days;
    console.log('Querying expense for user: ' + userId + ' for the past '  + days + ' days');
    var toDate = new Date();
    var fromDate = new Date();
    fromDate = fromDate.setDate(fromDate.getDate() - days);
    fromDate = new Date(fromDate);

    console.log('From date: ' + fromDate + ' to date: ' + toDate);

    switch (req.method) {

    case 'GET':
        expenses.find({userId: userId, dateTime: {$gte: fromDate, $lte: toDate}}).toArray(function(err, results) {
                res.send(results);
            });
        break;

    }

}

function expenseAdd(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

    console.log('Adding expense');

    console.log('Body: ' + req.body);

    var expenseItem = req.body;

    // Add expense item to DB
    expenseItem.dateTime = new Date(expenseItem.dateTime);
    console.log(expenseItem);
    expenses.insert(
        expenseItem,
        {safe: true},
        function(err, documents) {
            if (err) {
                throw err;
            }
            console.log('Expense id is: ' + documents[0]._id);
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
            if (err) {
                throw err;
            }
            console.log('Retrieved document: ' + document);
            res.send(document);
        }
    );

}

function expenseSave(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

    console.log('Saving expense');

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
            if (err) {
                throw err;
            }
            console.log('Expense saved successfully');
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
            if (err) {
                throw err;
            }
            console.log('Removed documents: ' + noOfDocsDeleted);
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

    // Return the user document (exclude password)
    users.findOne({_id: userId}, {password: 0},
        function(err, document) {
            if (err) {
                throw err;
            }
            console.log('Retrieved user: ' + document);
            res.send(document);
        }
    );

}

function findUserById(userId, callback) {

    // Return the user document (exclude password)
    users.findOne({_id: userId},
        function(err, document) {
            if (err) {
                throw err;
            }
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
        userName: newUser.name,
        language: newUser.language
    };

    // Add user to DB
    users.insert(
        user,
        {safe: true},
        function(err, documents) {
            if (err) {
                console.log('Error in adding user to DB: ' + err);
                res.send(500);
            }
            console.log('User: ' + newUser.username + ' registered successfully');

            // Login user
            console.log('Logging in user: ' + newUser.username);
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

function userSave(req, res, next) {

    if (!req.user) {
        res.send(401);
    }

    // Retrieve the id
    var userId = req.params.id;
    if (userId !== req.user.id) {
        res.send(401);
    }
    console.log('Getting user with id: ' + userId);

    var updateUser = req.body;
    var passwordUpdated = false;

    // Hash the password and save (if password was changed)
    if (!!updateUser.password && updateUser.password.length > 0) {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(updateUser.password, salt);
        updateUser.password = hashPassword;
        passwordUpdated = true;
    }

    // Update password
    if (passwordUpdated) {
        users.update(
            {_id: userId},
            {$set: {password: updateUser.password}},
            {safe: true},
            function(err, document) {
                if (err) {
                    throw err;
                }
                console.log('User password updated successfully');
            }
        );
    }

    // Update user to DB
    users.update(
        {_id: userId},
        {$set: {userName: updateUser.userName, language: updateUser.language}},
        {safe: true},
        function(err, document) {
            if (err) {
                throw err;
            }
            console.log('User info saved successfully');
            res.send(200);
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
            if (err) {
                throw err;
            }
            console.log('Category saved successfully');
            res.send(200);
        }
    );

}

function checkUserId(req, res, next) {

    // Retrieve the id
    var userId = req.params.id;

    console.log('Checking existing user with id: ' + userId);

    // Return the user document (exclude password)
    users.findOne({_id: userId}, {password: 0},
        function(err, document) {
            if (err) {
                throw err;
            }
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
        }

        console.log('Expense report data retrieved successfully');
        res.send(result);

    });

}

function forgotPassword(req, res, next) {

    // Retrieve the id
    var userId = req.params.id;

    console.log('Forgot password processing for user id: ' + userId);

    // Generate a uuid for reset password link
    var token = uuid.v4();
    var resetToken = token.replace(/\-/g, ''); // trim all "-" characters in the generated uuid

    console.log('Generated token: ' + resetToken);

    // Construct the password reset url
    //var resetUrl = baseURL + '/passwordresetform/' + resetToken;
    var resetUrl = req.headers.referer + '#/passwordresetform/' + resetToken;
    console.log('Link for request url: ' + resetUrl);

    // setup e-mail data
    var mailOptions = {
        from: 'My Expense Keeper<no-reply@skywidesoft.com>', // sender
        to: userId, // receiver
        subject: 'Password reset', // Subject line
        html: '<b>Please click the below link to reset your password:</b><br>' + resetUrl // html body
    };

    // Send email
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);

            // Save the request into DB
            var passwordReset = {
                _id: resetToken,
                userId: userId,
                requestDate: new Date()
            };

            passwordResets.insert(
                passwordReset,
                {safe: true},
                function(err, documents) {
                    if (err) {
                        console.log('Error in adding password reset to DB: ' + err);
                        res.send(500);
                    }
                    res.send(200);
                }
            );

        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

function resetPassword(req, res, next) {

    var passwordResetRequest = req.body;

    console.log('Reset password for user: ' + passwordResetRequest.userId);

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(passwordResetRequest.password, salt);

    // Update user
    users.update(
        {_id: passwordResetRequest.userId},
        {$set: {password: hashPassword}},
        {safe: true},
        function(err, document) {
            if (err) {
                console.log('Error saving user password');
                res.send(500);
            }
            console.log('User password resetted successfully');
            res.send(200);
        }
    );

}

function resetPasswordRequest(req, res, next) {

    // Retrieve the id
    var id = req.params.id;

    console.log('Retrieve password reset request for id: ' + id);

    // Return the reset request document
    // A request should have a valid id and within 7 days
    var fromDate = new Date();
    fromDate = fromDate.setDate(fromDate.getDate() - 7);
    fromDate = new Date(fromDate);

    passwordResets.findOne({_id: id, requestDate: {$gt: fromDate}},
        function(err, document) {
            if (err) {
                console.log('Error retrieving password reset request');
                res.send(500);
            }
            res.send(document);
        }
    );

}


exports.expenseList = expenseList;
exports.expenseAdd = expenseAdd;
exports.expenseGet = expenseGet;
exports.expenseSave = expenseSave;
exports.expenseRemove = expenseRemove;
exports.userGet = userGet;
exports.findUserById = findUserById;
exports.userAdd = userAdd;
exports.userSave = userSave;
exports.validPassword = validPassword;
exports.addCategoryForUser = addCategoryForUser;
exports.checkUserId = checkUserId;
exports.expenseReport = expenseReport;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.resetPasswordRequest = resetPasswordRequest;
