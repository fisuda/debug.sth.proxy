// 
// Copyright (C) 2019 Kazuhito Suda
//

'use strict';

const request = require('request');
const config = require('./config');
const http = require('http');
const urlParser = require('url');

const sth_url = 'http://192.168.11.241:8666';

http.createServer(function (request, res) {
    console.log('*** request ***');

    var key;

// url

    var url = urlParser.parse(request.url);

    console.log('*** URL');
    console.log('href : '     + url.href);
    console.log('protocol : ' + url.protocol);
    console.log('hostname : ' + url.hostname);
    console.log('path : '     + url.path);
    console.log('query : '    + url.query);

// Headers

    console.log('*** Headers');

    var headers = request.headers;
    for (key in headers) {
        console.log(key + ' : ' + headers[key]);
    }

// request to sth

    var headers = {
        'fiware-service': headers['fiware-service'],
        'fiware-servicepath': headers['fiware-servicepath'],
////        'cookie' : headers['cookie']
    }

    var options = {
        url: sth_url + url.path,
        method: 'GET',
        headers: headers,
    };
   
    console.log(options);
    console.log(headers);

    requestToSth(options).then(function (value) {
        console.log('status : ' + value[0].statusCode);
        
        console.log('header :');
        var h = value[0].headers;
        for (key in h) {
            console.log(key + ' : ' + h[key]);
        }

        console.log('body : ' + value[1]);

        var headers = value[0].headers;
        res.writeHead(value[0].statusCode, headers['content-type']);
        res.end(value[1]);
    }).catch(function (error) {
        res.sendStatus(500); // Internal Server Error
    });

}).listen(config.port, '0.0.0.0');

function requestToSth(options) {
  return new Promise(function (resolve, reject) {  
    request(options, function (error, response, body) {
      if (error) {
        console.log('error in requestToSth :' + error.message);
        reject(new Error(error.message));
      }
//      console.log('statusCode:', response && response.statusCode);
//      console.log('body:', body);
      resolve([response, body]);
    });
  });
}
