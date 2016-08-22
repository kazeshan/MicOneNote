import { Template } from 'meteor/templating';
import './body.html';
import { Tasks } from '../api/token.js';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});
