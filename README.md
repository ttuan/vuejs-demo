# Learning VueJS

Learn Vuejs by example, step by step

### Template Syntax

#### Directives
* `v-bind`: To add html attributes `v-bind:disabled`, `v-bind:id`, `v-bind:href=""`
    `v-bind:href="url"` = `:href="url"` = `:[key]="url"`
* `v-if`: With condition
* `v-for`: For loop
* `v-on:[eventName]="doingSomething"`: Handle action, for example, click button,
    focus, ...
    `v-on:click="doSomething"` = `@click="doSomething"` = `@[event]="doSomething"`
* `v-model="message"`: Modeling for data binding


#### Computed property
- Create a **getter**, we can call from vm, ex: `vm.reversedMessage`, always
    depended on `vm.message`
- Same function??? Function is code line that **do something**, computed
    create a getter, return some value.
  No, **computed properties are cached based on their reactive dependencies**. A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as message has not changed, multiple access to the reversedMessage computed property will immediately return the previously computed result without having to run the function again.
  In comparison, a method invocation will always run the function whenever a re-render happens.

#### Watched property
- Use `watched` when you have some data need to change based on other data (ex:
    `fullName` need to change if you change `firstName` or `lastName`)
  We should use `computed` for easy coding.
-  Using the watch option allows us to perform an asynchronous operation (accessing an API), limit how often we perform that operation, and set intermediary states until we get a final answer.

===> Compute and watch used to observe a property (firstName, lastName, question, answer, ...)

#### Class and style bindings
+ Class Syntax:
  + `v-bind:class="{ active: isActive }"`
  + `v-bind:class="classObject"` with computed function `classObject`
  + `v-bind:class="[activeClass, errorClass]"`

#### Conditional Rendering
+ `v-if="variable"`, `v-else` and `v-else-if="condition"`, if you put
    `v-else-if` after `v-else`, Vue just ignores it, not raises error.
+ Vue often re-using rendered elements instead of rendering form scratch. For
    example, when `<input>` element is in both if and else block, Vuejs will
    rerender it and keep same value which you entered. To ignore this, use `key`
    on each `<input>` tag.
+ `v-show` vs `v-if`:
  + `v-if` is also lazy, if the condition is fale in initial render, it will not
      do anything. The conditional block won't be rendered until the condition
      becomes true for the first time.
  + `v-show` is simpler - the element is always rendred regardless of initial
      condition, with CSS-based toggling.
  + `v-if` has higher toggle costs (cause rerender), `v-show` has higher initial
      render costs (cause it render when initial). Use `v-show` when you need to
      toggle something very often, and use `v-if` if the condition is unlikely
      to change at runtime.

#### List rendering
+ `v-for`: Use syntax: `v-for="item in items"`, support: `v-for="(item, index) in items"`. V-for can use to print all attribute of an object. `v-for="(value, name, index) in object"`
+ `v-for` should use with `v-bind:key="unique-key"`. ????

+ Array Change dection: `push()`, `pop`, `shift`, `unshift`, `splice`, `sort`,
    `reverse`

    `filter()`, `concat()`, `slice()` always return a new array - non-mutating
    methods.

+ Cause of JS limitations, Vue can not detect change when you call:
    `app.items[0] = newValue`, or `vm.items.length = newLength`. Please use
    `app.$set(app.items, indexOfItem, newValue)` or
    `vm.items.splice(newLength)`.

    To add more property (data), you should use `vm.$set(vm.property_name, 'attribute', value)`

+ To render a block of multiple elements, use `v-for` with `<template>`

#### Event handling
+ `v-on:click="counter + 1"` or `v-on:click="function_name"`

Event modifier:
We can use `event.preventDefault()` in function, but it's better if we only put
logic in function instead of pollute it with dealing DOM event.

Use `.stop`, `.prevent`, `.capture`, `.self`, `.once`, `.passive`:
`v-on:click.stop="doThis"`.

You can use `v-on:click.prevent.self="xxx"`, but PLEASE CARE THE ORDER OF
EVENTS.

Key modifer:
+ `v-on:keyup.enter="submit"`, `v-on:keyup.13="submit"`

System modifer:
+ `@keyup.alt.67="clear"` or `@click.ctrl="doSomething"` or
    `@click.ctrl.exact="doSomething"`

Mouse button modifier:
+ `.left`, `.right`, `.middle`

Benefit of using `v-on`:
+ Easy to locate the handle function by skimming HTML
+ keep ViewModel code can be pure logic and DOM free - easier to test
+ When ViewModel is destroyed, all event handler are automatically removed.

#### Form Input Bindings
+ `v-model` ignore initial `value`, `checked`, `selected` attributes found on
    any form elements. So we should declare the initial value on JS side, insde
      `data` option.

   This applies for `text`, `textarea`, `checkboxes`, `raido` button, `select`
   options.

+ Modifiers:
  + `v-model.lazy="msg"`: `v-model` syncs the input with data after each `input`
      event. if you add `lazy`, it will sync after `change` events instead.
  + `v-model.number="age"`: when you enter a string to age, `.number` will
      convert it by using `parseFloat()`, if it can not convert, vue will return
      original value.
  + `v-model.trim="msg"`: `trim` whitespace from user input
