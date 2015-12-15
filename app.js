var http = require('http');

//var needData = {}
var Pogoda = function(){
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
      console.log(result.result.temp_current_c);
      //cities = result.result.cities_to_forecast;
      //cities.forEach(function(item){console.log(item)});
      //console.log(result.result.cities_to_forecast);

     return result

   });
 });

};

var CronJob = require('cron').CronJob;
new CronJob('*/30 * * * * *', function() {
  new Pogoda();
}, null, true, 'America/Los_Angeles');
