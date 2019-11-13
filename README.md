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


#### Component Basic
+ Syntax:
```js
Vue.component('component-name', {
  data: function() {
    ....
  }
}
```
Component is a REUSEABLE VUE INSTANCES => Same as `new Vue()`, so they accept
same options like `data`, `computed`, `watch`, `method`, lifecycle hooks. They
only exxceptions are a few root-specific options like `el`.

+ `data` in component MUST BE A FUNCTION. so that each instance can maintain an
    independent copy of returned data objcet. If we don't put it into a
    function, data changed in a single component will affact the data of all
    other instances.

+ There are 2 types of component registration: global and local. Using
    `Vue.component` ~= global

+ Props are custom attributes which we can register on a component. When we pass
    it to prop attribute, it becomes a property on that component instance.

When you don't know exactly how many records will be passed,you should use syntax:
`v-for`, `v-bind:title="xxx"` instead :D
But if there are many attributes which you need to pass to component, it becomes
very annoying. so, passing "post" object is a better choice :D

+ Child component can emit an event by using syntax:
    `v-on:click="$emit('event-name')`, so parent component can handle it by
    using: `v-on:event-name="action code/ function name"`


+ Use `<slot></slot>` to pass content to a component.


#### Component In-Depth
+ Global registering all components means that even if you stop using a
    component, it could still be included in your final build (If you're using
    build system like Webpack). It increases the amount of JavaScript your users
    have to download.
NOTE: Locally registered components are not available in subcomponents.

+ When we have many base components, to auto regis them, use [Automatic Global Registration of Base components](https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components)


+ Data from parent to child component is a one-way-down binding. Vue prevents
    child components from accidentally mutating the parent's state.
There are usually two cases where it’s tempting to mutate a prop:

The prop is used to pass in an initial value;

1. the child component wants to use it as a local data property afterwards. In this case, it’s best to define a local data property that uses the prop as its initial value:

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. The prop is passed in as a raw value that needs to be transformed. In this case, it’s best to define a computed property using the prop’s value:

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
Note that objects and arrays in JavaScript are passed by reference, so if the prop is an array or object, mutating the object or array itself inside the child component will affect parent state.

+ Non-prop attributes: A non-prop attribute is an attribute that is passed to a
    component, but does not have a corresponding prop defined.

**Component** and **props** has automatic case transformation.

`v-model` on a component uses `value` as the prop and `input` as the event.

#### Custom Events
TODO

#### Slot
Same like

#### Dynamic and Asyns Components
+ Use `<keep-alive>` to cached a component after they are created for the first time


```
<!-- Inactive components will be cached! -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

+ Async components
In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it’s needed. To make that easier, Vue allows you to define your component as a factory function that asynchronously resolves your component definition. Vue will only trigger the factory function when the component needs to be rendered and will cache the result for future re-renders.
https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components

https://github.com/gothinkster/vue-realworld-example-app/blob/master/src/router/index.js#L10

#### Handling Edge Cases
TODO

### Transistion and Animation
TODO

### Reusability & Composition
#### Mixin
Like 'module' in Ruby :v It can be include in the component (same as class)

When a mixin and the component itself contain overlapping options, they will be “merged” using appropriate strategies. data objects undergo a recursive merge, with the component’s data taking priority in cases of conflicts.

Hook functions with the same name are merged into an array so that all of them will be called. Mixin hooks will be called before the component’s own hooks.

Options that expect object values, for example methods, components and directives, will be merged into the same object. The component’s options will take priority when there are conflicting keys in these objects

Use can use global mixin, but take care yourself

Use `Vue.config.optionMergeStrategies` to custom merge strategy :D

