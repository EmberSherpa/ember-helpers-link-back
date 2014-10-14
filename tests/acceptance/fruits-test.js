import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: /fruits', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('go there and back', function() {
  visit('/fruits');
  click('a:contains("Apples")');
  andThen(function(){
    equal(currentPath(), 'fruits.apples', "clicking on apples takes user to apples");
  });
  click('a:contains("Apples")');
  andThen(function(){
    equal(currentPath(), 'fruits.index', "second click takes back to original");
  });
});

test('go there and diagonally', function(){
  visit('/fruits');
  click('a:contains("Apples")');
  andThen(function(){
    equal(currentPath(), 'fruits.apples', "clicking on apples takes user to apples");
  });
  click('a:contains("Pears")');
  andThen(function(){
    equal(currentPath(), 'fruits.pears', "clicking on pears takes you to pears");
  });
});
