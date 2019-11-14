# Style Guide
## Essential
1. Multi-word component names
```js
Vue.component('todo-item', {
  // ...
})
export default {
  name: 'TodoItem',
  // ...
}
```

2. Component `data` must be a function

- To sperate data, each component instance to only manage its own data.

```js
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})
// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```

3. Prop definitions should be as detailed as possible

```js
// Even better!
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

4. Keyed `v-for`: Always use `key` with `v-for`

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

5. Advoid `v-if` with `v-for`

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

6. Component style scoping: Style in top-levl `App` component and in layout components may be global, but all other components should always be scoped.

```html
<template>
  <button class="button button-close">X</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

7. Private property names: Always use the `$_` prefix for custom private properties in a plugin, mixin, .. that should not be considered public API, to advoid conflicts with code by other author, also include a named scope.

```js
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```

## Strongly Recommended

1. Component files: Each component should be in its own file

```
components/
|- TodoList.js
|- TodoItem.js
```

2. Single-file component filename casing: should either be always PascalCase or alway kebab-case

```
components/
|- MyComponent.vue

or
|- my-component.vue
```

3. Base component names: should all begin with a specific prefix, such as `Base`, `App` or `V`

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

4. Single-instance component names: Component that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one.

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

5. Tightly coupled component names: Child components should include the parent component name as a prefix

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

6. Order of the words in component names: Component names should start with the highest-level (often most general) worlds and end with descriptive modifying words.

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

7. Self-closing components: Components with no content should be self-closing in single-file components, string template and JSX, but never in DOM template

```
<!-- In single-file components, string templates, and JSX -->
<MyComponent/>

<!-- In DOM templates -->
<my-component></my-component>
```

8. Component name casing in templates: should be PascalCase in single-file component and string template, but kebab-case in DOM templates

```
<!-- In single-file components and string templates -->
<MyComponent/>
<!-- In DOM templates -->
<my-component></my-component>
or
<!-- Everywhere -->
<my-component></my-component>
```

9. Component name casing in JS/JSX: should always be PascalCase, through they may be kebab-case inside strings for simple app that only use global component registration through `Vue.component`

```
Vue.component('MyComponent', {
  // ...
})
Vue.component('my-component', {
  // ...
})

import MyComponent from './MyComponent.vue'

export default {
  name: 'MyComponent',
  // ...
}
```

10. Full-word component names: should prefer full words over abbreviations.

```
// Bad
components/
|- SdSettings.vue
|- UProfOpts.vue

// Good
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

11. Prop name casing: should always use camelCase during declaration, but kebab-case in template and JSX

```
props: {
  greetingText: String
}

<WelcomeMessage greeting-text="hi"/>
```

12. Multi-attribute elements: should span multiple lines, with one attribute per line

```
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

13. Simple expressions in templates: should only include simple expressions, with more complex expressions refactored into computed properties or methods.

```
// Bad
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}

// Good
<!-- In a template -->
{{ normalizedFullName }}

// The complex expression has been moved to a computed property
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

14. Simple computed properties: Complex computed properties should be split init as many simpler properties as possible.

```
// Bad
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}

// Good
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

15. Quoted attribute values: Always warap it inside quotes

```
<input type="text">

<AppSidebar :style="{ width: sidebarWidth + 'px' }">

```

16. Directive shorthands: `:` for `v-bind:`, `@` for `v-on` and `#` for `v-slot` should be used always or never.

## Recommended
1. Component/instance options order

* Side Effect: `el`
* Global Awareness: `name`, `parent`
* Component Type: `functional`
* Template Modifiers: `delimiters`, `comments`
* Template Dependencies: `components`, `directives`, `filters`
* Composition: `extends`, `mixins`
* Interface: `inheritAttrs`, `model`, `props/propsData`
* Local State: `data`, `computed`
* Events: `watch`, lifecycle Event: `beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `activated`, `deactived`, `beforeDestroy`, `destroyed`
* Non-Reactive Properties: `methods`
* Rendering: `template/render`, `renderError`

2. Element attribute order

* Definition: `is`
* List rendering: `v-for`
* Conditionals: `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`
* Render Modifiers: `v-pre`, `v-once`
* Global Awareness: `id`
* Unique attributes: `ref`, `key`, `slot`
* Two-way Binding: `v-model`
* Other attributes: all unspecified bound & unbound attributes
* Events: `v-on`
* Content: `v-html`, `v-text`

3. Empty lines in component/instance options

Add a blank line between multi-line properties

4. Single-file ocmponent top-level element order

Should always order `<script>`, `<template>` and `<style>` cause style is less neccessary.

## Use with Caution

1. `v-if`/`v-else-if`/`v-else` without `key`

It's usally best to use `key` with `v-if` + `v-else`, if they are the same element type (bot `<div>` elements).

```html
<div
  v-if="error"
  key="search-status"
>
  Error: {{ error }}
</div>
<div
  v-else
  key="search-results"
>
  {{ results }}
</div>
```

2. Element selectors with `scoped`

Element selectors should be avoided with `scoped`

Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.

```
// Bad
<template>
  <button>X</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>

// Good
<template>
  <button class="btn btn-close">X</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

3. Implicit parent-child communication

Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.

//TODO

4. Non-flux state management

Vuex should be preferred for global state management, instead of this.$root or a global event bus.

// TODO





































