# correctness
A frontend javascript validation library.

## Introduction

correctness is a frontend validation library that makes setting up validation easy. My goal is to reduces hits on servers by reducing the number of repeated submits.

**Notes:**
* This currently uses jQuery 1.2.1 but has no definitive need to do so, I plan to build a non-jQuery version as and when I have time.
* I will keep adding information to this page. (When I get time! :S)

I plan to add a lot to the library but here is what it has to offer so far.

* Input Validation
* Anti-submit
* Error Messages (under reconstruction for v0.1.5).

#### Input Validation

The key to any validation, you must simply add a class to an input and call a function on document ready.

This is what an input with validation looks like:

    <input class="correctme" data-rule="-n-s" type="text" placeholder="name" name="usersname" />

It has the class `correctme` - this is the class that correctness uses to map inputs and it only will only check inputs with this class.

The data-rule attribute is what contains the validation methods. These flag what shouldn't be in the input, in this example numbers `-n` and spaces `-s` are not allowed.

#### Anti-Submit

correctness can also control the submit button of a form, it looks for the class `correctme-submit` when validating inputs. If there is an input that is not valid, the submit button will have the class `untouchable` added to it.

The `mod-form.css` file in this repository contains this class with rules that disallow elements with `untouchable` to be touched.

#### Error Messages

I built in an error message system but it's not yet elegant. This is what it looks like:

    <fieldset>
      <input class="correctme" data-rule="-s" name="example-text" />
      <div class="errMessage">
        <p>This is the error text. I will appear underneath the field and work on mobile!</p>
      </div>
    </fieldset>

By default the `errMessage` div should be `display: none;` and when it is needed, the parent will be given the class `invalidInput` which triggers the errMessage to be `display: block;` and `absolute`, the fieldset being `relative` to contain it.

At the moment most of this is driven by CSS which is better for speed but understandable more complicated as it adds another layer to this library.
