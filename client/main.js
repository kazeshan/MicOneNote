import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'
import { Mongo } from 'meteor/mongo';
import { Users } from '../imports/api/user.js';
import { Session } from 'meteor/session';

import './main.html';
import '../imports/ui/body.js';

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
    var fullUrl = window.location.href;
    Meteor.call('generateUID',guidGenerator(),fullUrl);
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

Template.body.helpers({
  users(){
    return Users.find().fetch();
  },
});

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

Meteor.startup(() => {
  var fullUrl = window.location.href;
  var uid = guidGenerator();
  Meteor.call('generateUID',uid,fullUrl, function(err, result){
    if(result['status'] == "success"){
      Session.set("tokenPack",result);
      var d = new Date();
      var n = d.getTime();
      alert(n);
      alert((Session.get("tokenPack")["expire_on"]*1000) - n);
    }else{
      if(result["status"] == "invalid_grant"){
        alert("key invaild or expired");
      }
    }
  });
});
