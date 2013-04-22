/**
 * Created with JetBrains WebStorm.
 * User: clarence
 * Date: 2013/04/19
 * Time: 11:23
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , api = require('./api');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use('/api/expense/listdata', api.expenseList);
    app.post('/api/expense', api.expenseAdd);
    app.get('/api/expense/:id', api.expenseGet);
    app.put('/api/expense/:id', api.expenseSave);
    app.delete('/api/expense/:id', api.expenseRemove);
    app.use(express.static(path.join(__dirname, 'app')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});