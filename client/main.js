import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'

import '../imports/ui/body.js';
import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.gettoken.onCreated(function gettokenOnCreated() {
  // counter starts at 0
  this.codeCount = new ReactiveVar(0);
  this.msg = new ReactiveVar("hello");
});

Template.gettoken.helpers({
  codeCount() {
    return Template.instance().codeCount.get();
  },
  msg(){
      return Template.instance().msg.get();
  },
});

Template.gettoken.events({
  'click .mybutton'(event, instance) {
    event.preventDefault();
    instance.codeCount.set(instance.codeCount.get() + 1);
    var inputcode = document.getElementById('codeinput').value;
    Meteor.call('tempFunction', inputcode);
    instance.msg.set("whut");
  },
});
