// Dev file...  has many console logs.
// Correctness ~ by Daniel Sarracayo :)
// Call 'correctness_init();' to initiate, best done on page-load.
// Add rules as needed.
// [ 'Flag to trigger check' , /Regex rule to match to/ , flag to give if match is true to regex].

"use strict";

var rules = [
  ['-l',/[a-zA-Z]/,true],
  ['-n',/[0-9]/,true],
  ['-s',/[ ]/,true],
  ['-e',/[^a-zA-Z0-9 \'-]/,true],
  ['email',/.+@.+\..+/i,false]
];

// Initialisation.
function correctness_init() {
  // Map fields.
  iss.exploreInputs();
  //Place event watcher on fields.
  $('.correctme').change(function(){
    var inputName = $(this).attr('name');
    console.log('====== Blurred '+inputName+' ======');
    var inputValu = $(this).val();
    var inputRule = $(this).data('rule');
    // Validate.
    if(iss.validate(inputValu, inputRule) && iss.isNum($(this), inputValu)) {
      vss.makeThisGreen(this);
    } else {
      vss.makeThisRed(this);
    }
  });
}

// View services.
var inputs = $('.correctme').length;
var vss = {

  makeThisRed : function(that) {
    // What to do when input goes red.
    var iName= $(that).attr('name');
    var iIndex = iss.getFor(iName,'index');
    console.log('Making '+iName+' Red it has an index of '+iIndex+'.');
    // Parent changes.
    $('.correctme').eq(iIndex).parent().addClass('invalidInput');
    $('.correctme').eq(iIndex).css('border','1px solid #FF0000');
    // Add to invalid list.
    iss.setFor(iName,false);
    $('.correctme-submit').addClass('untouchable');
  },

  makeThisGreen : function(that) {
    // What to do when input goes red.
    var iName= $(that).attr('name');
    var iIndex = iss.getFor(iName,'index');
    console.log('Making '+iName+' Green it has an index of '+iIndex+'.');
    // Parent changes.
    $('.correctme').eq(iIndex).parent().removeClass('invalidInput');
    $('.correctme').eq(iIndex).css('border','1px solid #999AA1');
    // Add to invalid list.
    iss.setFor(iName,true);
    if (iss.checkInputs()) $('.correctme-submit').removeClass('untouchable');
  }

};

// Input services.
var inputMap = [];
var iss = {

  exploreInputs : function() {
    $('.correctme').each(function(){
      inputMap.push([$(this).attr('name'),true]);
    });
  },

  checkInputs : function() {
    console.log('Checking Inputs.');
    for(var i = 0;i < inputMap.length;i++) {
      if(inputMap[i][1] === false) {
        console.log('There was a fail.');
        return false;
      }
    }
    console.log('Inputs were good.');
    return true;
  },

  setFor : function(rowName, value) {
    console.log('Setting '+value+' for '+rowName);
    for(var i = 0;i < inputMap.length;i++) {
      if(inputMap[i][0] == rowName) {
        inputMap[i][1] = value;
        console.log('Successfully set '+value);
        return true;
      }
    }
    console.log('Failed to find '+rowName);
  },

  getFor : function(rowName, form) {
    console.log('Searching for '+rowName+' and it\'s value.');
    for(var i = 0;i < inputMap.length;i++) {
      if (inputMap[i][0] == rowName) {
        switch (form) {
          case 'name':
            console.log('Returning the name of this row.');
            return inputMap[i][0];
          case 'index':
            console.log('Returning the index of this row (zeroed).');
            return i;
          case 'value':
            console.log('Returning the value of this row.');
            return inputMap[i][1];
          default:
            console.log('Row was found, no return form asked for.');
            return true;
        }
      }
    }
    return false;
  },

  isNum : function(that, str){
    if(that.attr('type') == 'number') {
      return iss.validateNum(that, str);
    } else {
      return true;
    }
  },

  validate : function(str, rule) {
    if(str) {
      console.log('Validating \''+str+'\'');
      for (var y = 0; y < rules.length; y++) {
        if(rule.indexOf(rules[y][0]) >= 0) {
          var l = rules[y][1];
          if (l.test(str) == rules[y][2]) {
            console.log('Failed '+rules[y][0]);
            return false;
          }
        }
      }
      console.log('Passed validation.');
      return true;
    } else {
      return true;
    }
  },

  validateNum : function(that, str) {
    if(str) {
      console.log(that.attr('type'));
      if(that.data('maxNum') != '') {
        console.log('Has maxNum val.');
        var input = +that.val();
        var maxRule = +that.attr('data-maxNum');
        console.log(typeof(input)+' '+input+' '+typeof(maxRule)+' '+maxRule);
        if(input > maxRule) {
          console.log('This number is too big.');
          return false;
        }
      }
      if(that.data('minNum') != '') {
        console.log('Has minNum val.');
        var input = +that.val();
        var minRule = +that.attr('data-minNum');
        console.log(typeof(input)+' '+input+' '+typeof(minRule)+' '+maxRule);
        if(input < minRule) {
          console.log('This number is too small.');
          return false;
        }
      }
      console.log('Has no num val.');
      return true;
    } else {
      return true;
    }
  }

};

var correctness = {
  version : "0.1.4"
};
