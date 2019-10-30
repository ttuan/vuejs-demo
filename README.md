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


#### Computed
- Same function???
- Create a getter, we can call from vm, ex: `vm.reversedMessage`, always
    depended on `vm.message`
