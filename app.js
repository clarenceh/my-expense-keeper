/**
 * Created with JetBrains WebStorm.
 * User: clarence
 * Date: 2013/04/19
 * Time: 11:23
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , api = require('./api');

var app = express();

function findById(id, fn) {
    console.log("User id: " + id);
    //var user = {id: 'ho.clarence@gmail.com', username: 'ho.clarence@gmail.com', password: 'maxell'};

    api.findUserById(id, function(user) {
        if (user) {
            fn(null, {id: user._id, username: user._id});
        } else {
            fn(new Error('User ' + id + ' does not exist'));
        }
    })

}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Authentication user with local strategy, username: " + username + ' password: ' + password);
        //var user = {id: 'ho.clarence@gmail.com', username: 'ho.clarence@gmail.com'};

        api.findUserById(username, function(user) {

            // User not found
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Password in-correct
            if (!api.validPassword(user.password, password)) {
                console.log('In-correct password');
                return done(null, false, { message: 'Incorrect password.' });
            }

            // User found and password match
            console.log("User found");
            return done(null, {id: user._id, username: user._id});
        })

    })
);

function login(req, res, next) {
    console.log("Start authenticate user");

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log('Local authentication error!');
            return next(err);
        }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.send(user);
        });
    });

}

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/api/expense/listdata', api.expenseList);
    app.post('/api/expense', api.expenseAdd);
    app.get('/api/expense/:id', api.expenseGet);
    app.put('/api/expense/:id', api.expenseSave);
    app.delete('/api/expense/:id', api.expenseRemove);
    app.get('/api/user/:id', api.userGet);
    app.post('/api/category', api.addCategoryForUser);
    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(401);
            }
            req.logIn(user, function(err) {
                console.log("Logging in user: " + user.username);
                if (err) { return next(err); }
                res.send(200);
            });
        })(req, res, next);
    });
    app.get('/logout',  function(req, res, next) {
        console.log('Logging out user: ' + req.user);
        req.logout();
        console.log('User logged out successfully');
        res.send(200);
    });
    app.post('/register', api.userAdd);
    app.use(express.static(path.join(__dirname, 'app')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});