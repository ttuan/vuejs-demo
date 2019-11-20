# Something learned from projects

Some HTML elements, for example <table> , have restrictions on
what elements can appear inside them. Custom elements that are not
in the whitelist will be hoisted out and thus not render properly. In
such cases you should use the is special attribute to indicate a
custom element.

`<tr v-for="story in stories" is="story" :story="story"></tr>`



When you are adding a new property that wasn’t present when the data
was observed, Vue.js cannot detect the property’s addition. So, if you
need to add or remove properties at runtime, use the global Vue.set or
Vue.delete methods.
