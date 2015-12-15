var http = require('http');
var str2json= require('string-to-json');

//var needData = {}

var data = JSON.stringify(
  {
    "method":"getForecast",
    "params":
      {"name":"current", "city":"nsk"}
  });

  //console.log(data);

var options = {
  protocol: "http:",
  host: "pogoda.ngs.ru",
  path: "/json",
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  }
}


var request = http.request(options);

request.write(data);
request.end();

request.on('response',function(response){
   var data = '';
   response.on('data', function(chunk) {
     data += chunk;
   });
   response.on('end', function() {
     var result = JSON.parse(data);
//      console.log(result);

      console.log(result.result.date);

     return result

   });
 });

console.log("!!!!!!!!!!!!!!!!!!!!!");

