import '../imports/api/token.js';
import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  tempFunction:function (code) {
    console.log("getting post");
    console.log(code);

    var str = "grant_type=authorization_code";
    str = str.concat("&client_id=2a19c276-5593-44b9-9508-99a68bb2b71d");
    str =  str.concat("&client_secret=vqbydRaSO1HERUmB6kbdgqvzmu3CA3kv/Tm4VEJXSyU=");
    str = str.concat("&redirect_uri=http://onenotebuild.azurewebsites.net");
    str = str.concat("&code="+code);
    str = str.concat("&resource=https://onenote.com/");

    HTTP.call("POST", "https://login.microsoftonline.com/4ae50cbe-be0d-4849-96c8-0ae667032237/oauth2/token",
    {content  : str},
    function (error, result) {
      if (!error) {
        console.log(JSON.stringify(result));
      }else{
        console.log(error+" " + result);
      }
    });

  }
});
