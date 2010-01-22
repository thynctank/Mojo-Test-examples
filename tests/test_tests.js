function TestTests() {}
TestTests.timeoutInterval = 2000;
var originalX = "Initial value";

TestTests.prototype = {
  before: function() {
    this.x = originalX;
    return Mojo.Test.beforeFinished;
  },
  "test that X has original value": function() {
    Mojo.requireEqual(originalX, this.x);
    this.x = "Another value";
    return Mojo.Test.passed;
  },
  "test 2 + 2 = 4, and also that this.x has been reset to originalX": function() {
    Mojo.requireEqual(4, 2 + 2, "two plus two must equal four");
    Mojo.requireEqual(originalX, this.x);
    return Mojo.Test.passed;
  },
  // onComplete takes single param (failure string) or null (for success)
  "test a short async call": function(onComplete) {
    window.setTimeout(onComplete, 500);
  },
  // tests longer than 1 sec of async require you to set an explicit timeoutInterval on the constructor object
  "test a long async call": function(onComplete) {
    window.setTimeout(onComplete, 1000);
  },
  // indicate failure by passing back an error string
  "test async failure": function(onComplete) {
    var failure = function() {
      onComplete("It's a dismal failure");
    };
    window.setTimeout(failure, 500);
  }
};