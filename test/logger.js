var logger = require('logger');
var assert = require('assert');

var tests = {
  'assert true': function(){
    assert.equal(logger(), 'test');
  }
}

module.exports = tests;