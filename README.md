# correctness
A frontend javascript validation library.

## Introduction

correctness is a frontend validation library that makes setting up validation easy. My goal is to reduces hits on servers by reducing the number of repeated submits.

## Note: This currently outdated - it will be update for the new version of correctness soon (0.2.0).

**Notes:**
* This currently uses jQuery 1.2.1 but has no definitive need to do so, I plan to build a non-jQuery version as and when I have time.
* I will keep adding information to this page. (When I get time! :S)

I plan to add a lot to the library but here is what it has to offer so far.

* Input Validation
* Anti-submit
* Error Messages (under reconstruction for v0.1.5).

### Input Validation

There are two main branches of validation in this library. String and Numbers.

All input values are read as strings but if the input type is a number then the value is converted into an integer.

I plan to change the system to automatically not accept text in a number input field but for now you must also specify the `data-rule` to be `-l-e` and also `-s` if the number is not expected to have spaces.

#### String Validation

String validations are requested by using the `data-rule` attribute. It tell correctness what is not allowed - there need to be looked for in the string. The example below shows a text input with a rule that disallows spaces `-s` and numbers `-n`.

    <input class="correctme" data-rule"-s-n" type="text" name="surname" />

###### Built in rules

These are the following rules you can parse:

Name|Tag|Description
----|---|-----------
Letters|`-l`|Will fails if there any letters of any case are found. (`a-z` and `A-Z`)
Numbers|`-n`|The numbers flag disallows all digits, 0 to 9.
Spaces|`-s`|Will fail if spaces are found in the string.
Extras|`-e`|This will fail if the string contains anything other than the following: (`a-z` `A-Z` `0-9` `'` `-`)
Email|`email`|This is a special flag **to be used by itself only**, it validates that an email has any text before an `@`(at sign) then any text after it, followed by a `.`(period) then any text after that.

###### Structure of Rules

All rules are store in an global array. The array of built in rules looks like this:

    var rules = [
      ['-l',/[a-zA-Z]/,true],
      ['-n',/[0-9]/,true],
      ['-s',/[ ]/,true],
      ['-e',/[^a-zA-Z0-9 \'-]/,true],
      ['email',/.+@.+\..+/i,false]
    ];

Each rule is a sub array of `rules` and each has 3 variables within them.

This is the structure of each rule:

Index|Name|Description
---|---|---
0|Flag|This is the string that is searched for in each input's `data-rule`, if it exists, the input value is test against the regex.
1|Regex|This is the regex that is used to test the input value against. It will give an output of true or false when used in testing.
2|Fail Value|This is the value that regex is expected to give out if the input value fails. So for `-l` if it's regex finds `a-z` or `A-Z` characters it will say true, then if the fail value is equal to what the regex said, it will flag a fail for the input being tested overall.

###### Custom Rules

In order to add your own rules I would recommend using the non-min version - for readability, if needed you can just minify it afterwards.

*Notes:*

* All rules **but the last** must have a comma after them.

* All rules must have a unique flag and one that does not contain another rule's flag e.g. if you make a new rule with a flag like `-log` then the letter rule `-l` is flagged also, even if not intended. My work around for this is to place an x before all custom rules, this way `-xlog` doesn't flag `-l`.

* I plan to build a way to split custom rules and common rules, meaning you'll be able to name the anything you wish.

#### Number Validation

Number validation is new in 0.1.4, it bring the ability to set a maximum and minimum range on number type fields.

Number fields should have the following rule, unfortunately this is not automatically set yet.

`data-rule="-l-s-e"`

###### Attributes Available

Name|Syntax|Description
---|---|--
maxNum|`maxNum="99"`|The input value would be fail if it is larger than this attribute.
minNum|`minNum="18"`|The input value would fail if it is smaller than this.

### Anti-Submit

correctness can also control the submit button of a form, it looks for the class `correctme-submit` when validating inputs. If there is an input that is not valid, the submit button will have the class `untouchable` added to it.

The `mod-form.css` file in this repository contains this class with rules that disallow elements with `untouchable` to be touched.

### Error Messages

I built in an error message system but it's not yet elegant. This is what it looks like:

    <fieldset>
      <input class="correctme" data-rule="-s" name="example-text" />
      <div class="errMessage">
        <p>This is the error text. I will appear underneath the field and work on mobile!</p>
      </div>
    </fieldset>

By default the `errMessage` div should be `display: none;` and when it is needed, the parent will be given the class `invalidInput` which triggers the errMessage to be `display: block;` and `absolute`, the fieldset being `relative` to contain it.

At the moment most of this is driven by CSS which is better for speed but understandable more complicated as it adds another layer to this library.
