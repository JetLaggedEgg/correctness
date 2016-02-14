// Correctness 0.2.0.
// Instantiate your own correctness object and feed it your settings.
var correctness = function() {

  // Master variables - allows hoisting.
  var mast = this;
  var sets = this.settings;

  // Master settings - with defaults.
  this.settings = {
    formBody : '.form-wrapper',
    formInputs : '.correctme',
    formSubmit : '.correctme-submit',
    invalidInput : '',
    invalidSubmit : ''
  };
  // Rules.
  this.rules = [
    ['-l',/[a-zA-Z]/,true],
    ['-n',/[0-9]/,true],
    ['-s',/[ ]/,true],
    ['-e',/[^a-zA-Z0-9 \'-]/,true],
    ['email',/.+@.+\..+/i,false]
  ];
  // Initialisation.
  this.init = function(news) {
    // Check for news.
    if(news) mast.import(news);
    console.log(mast.settings);
    // Find all inputs.
    mast.map.get();
    // Setup validation handlers.
    mast.assign();
  };
  // Settings import.
  this.import = function(news) {
    for(var i in news) {
      // Scan and replace if key exists in settings.
      console.log(i);
      if(mast.settings[i]) mast.settings[i] = news[i];
    }
  };
  // Assign click.
  this.assign = function () {
    $(mast.settings.formBody).find(mast.settings.formInputs).change(function() {
      console.log('====== Changed '+$(this).attr('name')+' ======')
      switch ($(this).attr('type')) {
        case 'text':
          if(mast.validate.str($(this).val(), $(this).data('rule'))) {
            mast.ui.green($(this));
            mast.map.set($(this).attr('name'), true);
            mast.map.check();
          } else {
            mast.ui.red($(this));
            mast.map.set($(this).attr('name'), false);
          }
          mast.map.check();
          break;
        case 'number':
          if(mast.validate.num($(this).val(), $(this).attr('data-maxNum'), $(this).attr('data-minNum'))) {
            mast.ui.green($(this));
            mast.map.set($(this).attr('name'), true);
            mast.map.check();
          } else {
            mast.ui.red($(this));
            mast.map.set($(this).attr('name'), false);
          }
          mast.map.check();
          break;
        case 'email':
          if(mast.validate.email($(this).val())) {
            mast.ui.green($(this));
            mast.map.set($(this).attr('name'), true);
          } else {
            mast.ui.red($(this));
            mast.map.set($(this).attr('name'), false);
          }
          mast.map.check();
          break;
        default:
         console.warn('Input type not recognised:'+$(this).attr('name')+'\s type of \''+$(this).attr('type')+'\'');
      }
    });
  };
  // UI interaction unit.
  this.ui = {
    red : function(that) {
      if(mast.settings.invalidInput){
        console.log('Making red.');
        that.toggleClass('invalid');
      } else {
        that.css('border','1px solid #FF0000');
      }
    },
    green : function(that) {
      that.css('border','initial');
    }
  };
  // Input map unit.
  this.map = {
    cache : [],
    get : function() {
      $(mast.settings.formInputs).each(function(){
        mast.map.cache.push([$(this).attr('name'),true]);
      });
    },
    check : function() {
      console.log('Checking inputs for invalid inputs.');
      var submitBttn = $(mast.settings.formBody).find(mast.settings.formSubmit);
      console.log(submitBttn.length);
      for(var i = 0;i < mast.map.cache.length;i++) {
        if(mast.map.cache[i][1] == false) {
          if(mast.settings.invalidSubmit) {
            submitBttn.addClass(mast.settings.invalidSubmit);
          } else {
            submitBttn.css('opacity','0.4');
            submitBttn.css('pointer-events','none');
          }
          return false;
        }
      }
      if(mast.settings.invalidSubmit){
        submitBttn.removeClass(mast.settings.invalidSubmit);
      } else {
        submitBttn.css('opacity','1');
        submitBttn.css('pointer-events','auto');
      }
      return true;
    },
    set : function(row, value) {
      console.log('Setting '+row+' in cache to '+value);
      for(var i = 0;i < mast.map.cache.length;i++) {
        if(mast.map.cache[i][0] == row) {
          mast.map.cache[i][1] = value;
          return true;
        }
      }
      return false;
    }
  };
  // Validation unit.
  this.validate = {
    num : function (str, max, min) {
      if(str){
        console.log('testing '+(+str)+' to '+(+max)+' or '+(+min));
        if(max) {
          if(+str < +max){}else{return false}
        }
        if(min) {
          if(+str > +min){}else{return false}
        }
        return true;
      }
      return true;
    },
    str : function (str, rule) {
      if(str) {
        for (var y = 0; y < mast.rules.length; y++) {
          if(rule.indexOf(mast.rules[y][0]) >= 0) {
            var l = mast.rules[y][1];
            if (l.test(str) == mast.rules[y][2]) {
              return false;
            }
          }
        }
        return true;
      }
      return true;
    },
    email : function (str) {
      // Email reg exp. Change to a more complex one if you wish.
      var reg = /.+@.+\..+/i;
      if(str) {
        if(reg.test(str)) return true;
        return false;
      }
      return true;
    }
  };


};
