const express = require('express'),
http = require('http'),
path = require('path'),
fs = require('fs'),
bodyParser = require('body-parser'),
url = require('url');
const app = express();

app.use(express.static('jump_game'));

// home directory
app.get('/index.html', function(req,res){
    res.sendFile(__dirname + "/jump_game/" + "index.html");
})
// game map builder dir
app.get('/buildmap', function(req,res){
    res.sendFile(__dirname + "/jump_game/" + "mapbuilder.html");
})
// gaming dir
app.get('/gaming', function(req,res){
    console.log(req.query.id);
    res.sendFile(__dirname + "/jump_game/" + "gaming.html");
})

app.get('/gaming/js/game.js', function(req,res){
    res.sendFile(__dirname + "/jump_game/" + "js/game.js");
})

app.get('/gaming/img/:imgnum', function(req,res){
    res.sendFile(__dirname + "/jump_game/img/" + req.params.imgnum +".png");
})

app.get('/gaming/mapDatas/:name', function(req,res){
    console.log("mapxml: "+req.params.name);
    res.sendFile(__dirname + "/jump_game/" + "mapDatas/"+req.params.name);
})

// Rest Post fot upload game map xml
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.post('/post_mapdata',urlEncodedParser,function(req,res){
    fs.writeFile(__dirname + "/jump_game/" + "mapDatas/" + req.body.mapname + ".xml",
                req.body.xmldata, function(err){
                    return err;
                });
})


var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("http://%s:%s", host, port) 
})