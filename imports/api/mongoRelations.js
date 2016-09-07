import { Mongo } from 'meteor/mongo';
export const NotebooksDB = new Mongo.Collection('notebooks');
export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  Meteor.publish('notebooks', function notebooksPublication() {
      return NotebooksDB.find();
  });
  Meteor.publish('students', function studentsPublication() {
      return Students.find();
  });
}else{
  Meteor.subscribe('notebooks');
  Meteor.subscribe('students');
}
