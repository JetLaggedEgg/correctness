# correctness
A frontend javascript validation library.

## Introduction

correctness is a frontend validation library that makes setting up validation easy.

**Notes:**
* This currently uses jQuery 1.2.1 but has no need to, I plan to build a non-jQuery version as and when.
* I will keep adding information to this page, when I get time! :S

I plan to add a lot to the library but here is what it has to offer so far.

#### Input Validation

The key to any validation, you must simply add a class to an input and call a function on document ready.

This is what an input with validation looks like:

    <input class="correctme" data-rule="-n-s" type="text" placeholder="name" name="usersname" />

It has the class `correctme` - this is the class that correctness uses to map inputs and it only checks input with this class. The name comes from the phrase 'correct me if i'm wrong'.

The data-rule attribute is what contains the validation methods. These flag what shouldn't be in the input, in this example numbers `-n` and spaces `-s` are not allowed.

#### Error Messages

I have an error message system built in but it's not yet elegant. This is what it looks like

    <fieldset>
      <input class="correctme" data-rule="-s" name="example-text" />
      <div class="errMessage">
        <p>This is the error text. I will appear underneath the field and work on mobile!</p>
      </div>
    </fieldset>

By default the `errMessage` div will be `display: none;` and when it is needed, the parent will be given the class `invalidInput` which triggers the errMessage to be `display: block;` and `absolute`, the fieldset being `relative` to contain it.
