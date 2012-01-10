
/**
 * Module dependencies.
 */

var should = require('../');

function err(fn, msg) {
  try {
    fn();
    should.fail('expected an error');
  } catch (err) {
    should.equal(msg, err.message);
  }
}

module.exports = {
  'test .version': function(){
    should.version.should.match(/^\d+\.\d+\.\d+$/);
  },

  'test double require': function(){
    require('should').should.equal(should);
  },

  'test assertion': function(){
    'test'.should.be.a.string;
    should.equal('foo', 'foo');
  },
  
  'test true': function(){
    true.should.be.true;
    false.should.not.be.true;
    (1).should.not.be.true;
    
    err(function(){
      'test'.should.be.true;
    }, "expected 'test' to be true")
  },
  
  'test ok': function(){
    true.should.be.ok;
    false.should.not.be.ok;
    (1).should.be.ok;
    (0).should.not.be.ok;
    
    err(function(){
      ''.should.be.ok;
    }, "expected '' to be truthy");
    
    err(function(){
      'test'.should.not.be.ok;
    }, "expected 'test' to be falsey");
  },
  
  'test false': function(){
    false.should.be.false;
    true.should.not.be.false;
    (0).should.not.be.false;
    
    err(function(){
      ''.should.be.false;
    }, "expected '' to be false")
  },
  
  'test arguments': function(){
    var args = (function(){ return arguments; })(1,2,3);
    args.should.be.arguments;
    [].should.not.be.arguments;
  },
  
  'test .equal()': function(){
    var foo;
    should.equal(undefined, foo);
  },
  
  'test typeof': function(){
    'test'.should.be.a('string');

    err(function(){
      'test'.should.not.be.a('string');
    }, "expected 'test' not to be a string");
    
    (5).should.be.a('number');

    err(function(){
      (5).should.not.be.a('number');
    }, "expected 5 not to be a number");
  },
  
  'test instanceof': function(){
    function Foo(){}
    new Foo().should.be.an.instanceof(Foo);

    err(function(){
      (3).should.an.instanceof(Foo);
    }, "expected 3 to be an instance of Foo");
  },
  
  'test within(start, finish)': function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);
    
    err(function(){
      (5).should.not.be.within(4,6);
    }, "expected 5 to not be within 4..6");
    
    err(function(){
      (10).should.be.within(50,100);
    }, "expected 10 to be within 50..100");
  },
  
  'test above(n)': function(){
    (5).should.be.above(2);
    (5).should.be.greaterThan(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6);
    }, "expected 5 to be above 6");
    
    err(function(){
      (10).should.not.be.above(6);
    }, "expected 10 to be below 6");
  },
  
  'test match(regexp)': function(){
    'foobar'.should.match(/^foo/)
    'foobar'.should.not.match(/^bar/)
    
    err(function(){
      'foobar'.should.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");
    
    err(function(){
      'foobar'.should.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i");
  },
  
  'test length(n)': function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);
    
    err(function(){
      (4).should.have.length(3);
    }, 'expected 4 to have a property \'length\'');
    
    err(function(){
      'asd'.should.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");
  },
  
  'test eql(val)': function(){
    'test'.should.eql('test');
    ({ foo: 'bar' }).should.eql({ foo: 'bar' });
    (1).should.eql(1);
    '4'.should.not.eql(4);
    
    err(function(){
      (4).should.eql(3);
    }, 'expected 4 to equal 3');
  },
  
  'test equal(val)': function(){
    'test'.should.equal('test');
    (1).should.equal(1);
    
    err(function(){
      (4).should.equal(3);
    }, 'expected 4 to equal 3');
    
    err(function(){
      '4'.should.equal(4);
    }, "expected '4' to equal 4");
  },
  
  'test empty': function(){
    ''.should.be.empty;
    [].should.be.empty;
    ({ length: 0 }).should.be.empty;
    
    err(function(){
      ({}).should.be.empty;
    }, 'expected {} to have a property \'length\'');
    
    err(function(){
      'asd'.should.be.empty;
    }, "expected 'asd' to be empty");
    
    err(function(){
      ''.should.not.be.empty;
    }, "expected '' not to be empty");
  },
  
  'test property(name)': function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');
    
    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
  },
  
  'test property(name, val)': function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);
    
    err(function(){
      'asd'.should.have.property('length', 4);
    }, "expected 'asd' to have a property 'length' of 4, but got 3");
    
    err(function(){
      'asd'.should.not.have.property('length', 3);
    }, "expected 'asd' to not have a property 'length' of 3");
    
    err(function(){
      'asd'.should.not.have.property('foo', 3);
    }, "'asd' has no property 'foo'");
    
    err(function(){
      'asd'.should.have.property('constructor', Number);
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");
  },
  
  'test ownProperty(name)': function(){
    'test'.should.have.ownProperty('length');
    'test'.should.haveOwnProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');
    
    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  },

  'test include() with string': function(){
    'foobar'.should.include('bar');
    'foobar'.should.include('foo');
    'foobar'.should.not.include('baz');
  
    err(function(){
      'foobar'.should.include('baz');
    }, "expected 'foobar' to include 'baz'");
    
    err(function(){
      'foobar'.should.not.include('bar');
    }, "expected 'foobar' to not include 'bar'");
  },

  'test include() with array': function(){
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('bar');
    [1,2].should.include(1);
    ['foo', 'bar'].should.not.include('baz');
    ['foo', 'bar'].should.not.include(1);

    err(function(){
      ['foo'].should.include('bar');
    }, "expected [ 'foo' ] to include 'bar'");
    
    err(function(){
      ['bar', 'foo'].should.not.include('foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo'");
  },
  
  'test includeEql() with array': function(){
    [['foo'], ['bar']].should.includeEql(['foo']);
    [['foo'], ['bar']].should.includeEql(['bar']);
    [['foo'], ['bar']].should.not.includeEql(['baz']);
    [].should.not.includeEql(['baz']);

    err(function(){
      [['foo']].should.includeEql(['bar']);
    }, "expected [ [ 'foo' ] ] to include an object equal to [ 'bar' ]");
    
    err(function(){
      [['foo']].should.not.includeEql(['foo']);
    }, "expected [ [ 'foo' ] ] to not include an object equal to [ 'foo' ]");
  },
  
  'test keys(array)': function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');

    err(function(){
      ({ foo: 1 }).should.have.keys();
    }, "keys required");
    
    err(function(){
      ({ foo: 1 }).should.have.keys([]);
    }, "keys required");
    
    err(function(){
      ({ foo: 1 }).should.not.have.keys([]);
    }, "keys required");
    
    err(function(){
      ({ foo: 1 }).should.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");
    
    err(function(){
      ({ foo: 1 }).should.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");
    
    err(function(){
      ({ foo: 1 }).should.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");
  
    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");
    
    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");
    
    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");
  },
  
  'test chaining': function(){
    var user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };
    user.should.have.property('pets').with.lengthOf(4);
 
    err(function(){
      user.should.have.property('pets').with.lengthOf(5);
    }, "expected [ 'tobi', 'loki', 'jane', 'bandit' ] to have a length of 5 but got 4");
 
    user.should.be.a('object').and.have.property('name', 'tj');
  },

  'test throw()': function(){
    (function(){}).should.not.throw();
    (function(){ throw new Error('fail') }).should.throw();

    err(function(){
      (function(){}).should.throw();
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){
        throw new Error('fail');
      }).should.not.throw();
    }, 'expected no exception to be thrown, got "fail"');
  },

  'test throw() with regex message': function(){
    (function(){ throw new Error('fail'); }).should.throw(/fail/);

    err(function(){
      (function(){}).should.throw(/fail/);
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw(/fail/);
    }, "expected an exception to be thrown with a message matching '/fail/', but got 'error'");
  },

  'test throw() with string message': function(){
    (function(){ throw new Error('fail'); }).should.throw('fail');

    err(function(){
      (function(){}).should.throw('fail');
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw('fail');
    }, "expected an exception to be thrown with a message matching 'fail', but got 'error'");
  }
}; 