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
