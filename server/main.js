import './api/onenote_api.js';
import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import { NotebooksDB } from '../imports/api/mongoRelations.js';
import { EJSON } from 'meteor/ejson'

Meteor.startup(() => {

});

Meteor.methods({
  getNoteBooks:function (code) {
    Meteor.call('API_getNoteBooks', code, function(err, result){
      if(result["statusCode"] == 200)
      {
        var values = EJSON.parse(result["content"])["value"];
        for(i = 0; i < values.length; i++){
          var id = values[i]["id"];
          var name = values[i]["name"];
          NotebooksDB.insert({rawId: id, name: name});
        }
      }
    });
  }
});
