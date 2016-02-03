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
  $('.correctme').blur(function(){
    var inputName = $(this).attr('name');
    var inputValu = $(this).val();
    var inputRule = $(this).data('rule');
    // Validate.
    if(iss.validate(inputValu, inputRule)) {
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
    for(var i = 0;i < inputMap.length;i++) {
      if(inputMap[i][1] === false) {
        return false;
      }
    }
    return true;
  },

  setFor : function(rowName, value) {
    for(var i = 0;i < inputMap.length;i++) {
      if(inputMap[i][0] == rowName) {
        inputMap[i][1] = value;
        return true;
      }
    }
  },

  getFor : function(rowName, form) {
    for(var i = 0;i < inputMap.length;i++) {
      if (inputMap[i][0] == rowName) {
        switch (form) {
          case 'name':
            return inputMap[i][0];
          case 'index':
            return i;
          case 'value':
            return inputMap[i][1];
          default:
            return true;
        }
      }
    }
    return false;
  },

  validate : function(str, rule) {
    if (str) {
      for (var y = 0; y < rules.length; y++) {
        if(rule.indexOf(rules[y][0]) >= 0) {
          var l = rules[y][1];
          if (l.test(str) == rules[y][2]) {
            return false;
          }
        }
      }
      return true;
    } else {
      return true;
    }
  }

};

var correctness = {
  version : "0.1.3"
};
