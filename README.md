# Correctness - 0.2.0

### Introduction

###### What is Correctness?

Correctness is a frontend website validation library that makes it easy to setup client-side form validation.

###### So why validate?

Validating forms ensures data is accurate and legitimate, validation is recommended on the server side of a website but to reduce un-needed invalid requests, frontend validation is the answer. My need for this library was to have a reusable and expandable code base that I could use for all validation and tweak if needed.

### Usage

#### Initialisation

In order to Initialise the library you must simple create instances of the `Correctness` object like so.

    var form1 = new Correctness;

I would recommend making a new instance for each form.

The next thing to do is give the new object settings to follow. Here is an example:

    form1.init({
      formBody : '#form1',
      formInputs: '.form-input',
      formSubmit: '.form-submit',
      onInvalid: function() {
        // Do something when an input is invalid.
      },
      onValid: function() {
        // Do something when an input is valid.
      }
    });

This is an object with all settings available at the moment being set. This is done by calling `init` under `form1`.

#### Settings

These are the variables that are settable so far. Any settings that aren't specified will be defaulted to built in ones.

These the defaults:

    this.settings = {
      formBody : '.form-wrapper',
      formInputs : '.correctme',
      formSubmit : '.correctme-submit',
      onValid : function(input) {
        input.css('border','initial');
      },
      onInvalid : function(input) {
        input.css('border','1px solid #FF0000');
      }
    };

###### formBody

A specified ID or Class selector for the parent form element.

`.formClass` is a class selector - preceded by a period `.`.

`#formID` is an ID selector - preceded by a pound sign `#`.

The `formBody` variable dictates what form element is being targeted - thus this is the most important variable. It has a default of `.form-wrapper` and so if a form exists with that class it would be selected.

###### formInputs

A Class that is used to specify which inputs are to be validated.

`.correctme` is an example - only inputs with this class would be validated.

ID's aren't recommended to select inputs as there is usually more than one and multiple identical ID's aren't HTML compliant.

###### formSubmit

A selector for the submit button of a form.

`.correctme-submit` is an example.

This selector is used to add the class `untouchable` to the submit button when a input is marked invalid - only when all inputs have a valid value does the class get removed from the button.

I plan to add the ability to specify what happens when an input becomes invalid soon.

###### onInvalid and onValid

These are functions that can be specified. They are fired when an input becomes valid or invalid respectively and are parsed the input that triggered it.

`onValid` is triggered when an input becomes valid and is parsed the input.

`onInvalid` is triggered when an input becomes invalid and is also parsed the input.

    onInvalid : function(parsedInput) {
      console.log(parsedInput.attr('name'));
    }

The function above would console log the name attribute of the input that tirggered it.

By default they access the parsed input and place a border relative to the situation on it. So for invalid a red border would be added and for valid a initial grey one would be added.
