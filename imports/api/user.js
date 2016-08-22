import { Mongo } from 'meteor/mongo';
export const Users = new Mongo.Collection('users');

currUUID = "";

if (Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
    if(currUUID != ""){
      return Users.find({ uuid : currUUID });
    }
  });
}else{
  Meteor.subscribe('users');
}
