import { Mongo } from 'meteor/mongo';
export const NotebooksDB = new Mongo.Collection('notebooks');

if (Meteor.isServer) {
  Meteor.publish('notebooks', function notebooksPublication() {
      return NotebooksDB.find();
  });
}else{
  Meteor.subscribe('notebooks');
}
