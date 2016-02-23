var config =      {
      accessKeyId: "vS5XyoMoM30ZmRIA",
      secretAccessKey: "WLh8RUvzzVrPEbQbGGPDPzjl7wt0fd",
      endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
      apiVersion: '2013-10-15'
};
var ALY = require('aliyun-sdk');
var oss = new ALY.OSS(config);

var fs = require('fs');


putObject = function(source, dest, contentType, cb) {
  console.log("uploading... %s, %s, %s ", source, dest, contentType);
  fs.readFile(source, function (err, data) {
    if (err) {
      console.log('error:', err);
      return;
    }

    oss.putObject({
      Bucket: 'file2-tttalk-org',
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

exports.putObject = putObject;
