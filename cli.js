#!/usr/bin/env node
'use strict';

const meow = require('meow');

var cli = meow({
  help: [
    'Usage',
    '  oss_upload source  dest content_type',
    '',
    'Example',
    '  oss_upload aa.png  /aa.png  image/png'
  ].join('\n')
});

var config =      {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  endpoint: process.env.endpoint,
  apiVersion: '2013-10-15'
};
var ALY = require('aliyun-sdk');
var oss = new ALY.OSS(config);

var fs = require('fs');


var putObject = function(source, dest, contentType, cb) {
  console.log("uploading... %s, %s, %s ", source, dest, contentType);
  fs.readFile(source, function (err, data) {
    if (err) {
      console.log('error:', err);
      return;
    }

    oss.putObject({
      Bucket: process.env.Bucket,
      Key: dest,
      Body: data,
      AccessControlAllowOrigin: '',
      ContentType: contentType,
      CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
      ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
      ContentEncoding: 'utf-8',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
      ServerSideEncryption: 'AES256',
      Expires: (new Date()).getTime() + 3600 * 1000                       // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
    }, function (err, data) {

      if (err) {
        console.log('error:', err);
        return;
      }
      console.log('success:', data);
    });
  });
};


putObject(cli.input[0], cli.input[1], cli.input[2]);
